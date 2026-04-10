import { authOptions } from '@/lib/auth'
import { teamMemberService } from '@/lib/team-member.service'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session?.user?.email)
}

export async function GET() {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const members = await teamMemberService.listAdmin()
    return NextResponse.json({ success: true, data: members }, { status: 200 })
  } catch (error) {
    console.error('Error al listar equipo en admin:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { nombre, slug, puesto, bio, fotoUrl, especialidades, activo, orden } = body ?? {}

    if (!nombre || !puesto || !bio || !fotoUrl) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const member = await teamMemberService.create({
      nombre: String(nombre),
      slug: slug ? String(slug) : undefined,
      puesto: String(puesto),
      bio: String(bio),
      fotoUrl: String(fotoUrl),
      especialidades: Array.isArray(especialidades)
        ? especialidades.map((item: unknown) => String(item))
        : [],
      activo: activo === undefined ? true : Boolean(activo),
      orden: orden === undefined ? 0 : Number(orden),
    })

    return NextResponse.json({ success: true, data: member }, { status: 201 })
  } catch (error) {
    console.error('Error al crear miembro del equipo:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
