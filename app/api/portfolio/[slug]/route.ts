import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type Params = {
  params: Promise<{ slug: string }>
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { slug } = await params
    const project = await portfolioProjectService.getPublicBySlug(slug)

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener detalle de portfolio:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}