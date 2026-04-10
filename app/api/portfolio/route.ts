import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const projects = await portfolioProjectService.listPublic()
    return NextResponse.json({ success: true, data: projects }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener portfolio público:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}