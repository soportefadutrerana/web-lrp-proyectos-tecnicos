import { validatePortfolioPayload } from '@/lib/admin-api-validation'
import { authOptions } from '@/lib/auth'
import { portfolioProjectService } from '@/lib/portfolio-project.service'
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
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const projects = await portfolioProjectService.listAdmin()
    return NextResponse.json({ success: true, data: projects }, { status: 200 })
  } catch (error) {
    console.error('Error al listar portfolio como admin:', error)
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
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = validatePortfolioPayload(body, 'create')

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const {
      titulo,
      slug,
      categoria,
      ubicacion,
      anio,
      descripcion,
      imagenPrincipal,
      imagenes,
      destacado,
      publicado,
      orden,
    } = validation.data

    if (Boolean(destacado)) {
      const featuredCount = await portfolioProjectService.countFeatured()

      if (featuredCount >= 2) {
        return NextResponse.json(
          { success: false, error: 'Solo pueden existir 2 proyectos destacados como máximo.' },
          { status: 400 }
        )
      }
    }

    const project = await portfolioProjectService.create({
      titulo: String(titulo),
      slug: slug ? String(slug) : undefined,
      categoria: String(categoria),
      ubicacion: String(ubicacion),
      anio: Number(anio),
      descripcion: String(descripcion),
      imagenPrincipal: String(imagenPrincipal),
      imagenes: Array.isArray(imagenes) ? imagenes.map((item) => String(item)) : [],
      destacado: Boolean(destacado),
      publicado: publicado === undefined ? true : Boolean(publicado),
      orden: orden === undefined ? undefined : Number(orden),
    })

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Error al crear proyecto portfolio:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
