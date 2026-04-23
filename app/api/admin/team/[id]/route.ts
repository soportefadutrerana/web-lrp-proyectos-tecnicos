import { authOptions } from '@/lib/auth'
import { validateTeamPayload } from '@/lib/admin-api-validation'
import { teamMemberService } from '@/lib/team-member.service'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session?.user?.email)
}

function parseId(value: string) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const { id: rawId } = await params
    const id = parseId(rawId)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identificador inválido' },
        { status: 400 }
      )
    }

    const member = await teamMemberService.getById(id)

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'Miembro no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: member }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener miembro del equipo:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const { id: rawId } = await params
    const id = parseId(rawId)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identificador inválido' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validation = validateTeamPayload(body, 'update')

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const data = validation.data

    const member = await teamMemberService.update(id, {
      nombre: data.nombre,
      slug: data.slug,
      puesto: data.puesto,
      bio: data.bio,
      fotoUrl: data.fotoUrl,
      especialidades: data.especialidades,
      activo: data.activo,
      orden: data.orden,
    })

    return NextResponse.json({ success: true, data: member }, { status: 200 })
  } catch (error) {
    console.error('Error al actualizar miembro del equipo:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const { id: rawId } = await params
    const id = parseId(rawId)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identificador inválido' },
        { status: 400 }
      )
    }

    await teamMemberService.delete(id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar miembro del equipo:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
