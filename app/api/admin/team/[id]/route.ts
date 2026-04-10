import { authOptions } from '@/lib/auth'
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

    const member = await teamMemberService.update(id, {
      nombre: body.nombre !== undefined ? String(body.nombre) : undefined,
      slug: body.slug !== undefined ? String(body.slug) : undefined,
      puesto: body.puesto !== undefined ? String(body.puesto) : undefined,
      bio: body.bio !== undefined ? String(body.bio) : undefined,
      fotoUrl: body.fotoUrl !== undefined ? String(body.fotoUrl) : undefined,
      especialidades: Array.isArray(body.especialidades)
        ? body.especialidades.map((item: unknown) => String(item))
        : undefined,
      activo: body.activo !== undefined ? Boolean(body.activo) : undefined,
      orden: body.orden !== undefined ? Number(body.orden) : undefined,
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
