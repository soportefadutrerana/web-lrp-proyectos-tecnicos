import { authOptions } from '@/lib/auth'
import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { cleanupManagedUploads } from '@/lib/upload-cleanup.service'
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
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id: rawId } = await params
    const id = parseId(rawId)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identificador inválido' },
        { status: 400 }
      )
    }

    const project = await portfolioProjectService.getAdminById(id)

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener proyecto portfolio:', error)
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
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
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

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Body inválido' },
        { status: 400 }
      )
    }

    const existingProject = await portfolioProjectService.getAdminById(id)

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    if (body.destacado !== undefined) {
      const wantsFeatured = Boolean(body.destacado)

      if (wantsFeatured && !existingProject.destacado) {
        const featuredCount = await portfolioProjectService.countFeatured(id)

        if (featuredCount >= 2) {
          return NextResponse.json(
            { success: false, error: 'Solo pueden existir 2 proyectos destacados como máximo.' },
            { status: 400 }
          )
        }
      }
    }

    const nextMainImage =
      body.imagenPrincipal !== undefined
        ? String(body.imagenPrincipal)
        : existingProject.imagenPrincipal

    const nextGalleryImages = Array.isArray(body.imagenes)
      ? body.imagenes.map((item: unknown) => String(item))
      : existingProject.imagenes

    const previousImageUrls = [existingProject.imagenPrincipal, ...(existingProject.imagenes ?? [])]
    const nextImageSet = new Set([nextMainImage, ...nextGalleryImages])
    const removedImageUrls = previousImageUrls.filter((url) => !nextImageSet.has(url))

    const project = await portfolioProjectService.update(id, {
      titulo: body.titulo !== undefined ? String(body.titulo) : undefined,
      slug: body.slug !== undefined ? String(body.slug) : undefined,
      categoria: body.categoria !== undefined ? String(body.categoria) : undefined,
      ubicacion: body.ubicacion !== undefined ? String(body.ubicacion) : undefined,
      anio: body.anio !== undefined ? Number(body.anio) : undefined,
      descripcion: body.descripcion !== undefined ? String(body.descripcion) : undefined,
      imagenPrincipal:
        body.imagenPrincipal !== undefined ? String(body.imagenPrincipal) : undefined,
      imagenes: Array.isArray(body.imagenes)
        ? body.imagenes.map((item: unknown) => String(item))
        : undefined,
      destacado: body.destacado !== undefined ? Boolean(body.destacado) : undefined,
      publicado: body.publicado !== undefined ? Boolean(body.publicado) : undefined,
      orden: body.orden !== undefined ? Number(body.orden) : undefined,
    })

    if (removedImageUrls.length > 0) {
      await cleanupManagedUploads(removedImageUrls, { excludePortfolioProjectId: id })
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 })
  } catch (error) {
    console.error('Error al actualizar proyecto portfolio:', error)
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
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id: rawId } = await params
    const id = parseId(rawId)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identificador inválido' },
        { status: 400 }
      )
    }

    const existingProject = await portfolioProjectService.getAdminById(id)

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    const imageUrls = [existingProject.imagenPrincipal, ...(existingProject.imagenes ?? [])]

    await portfolioProjectService.delete(id)

    if (imageUrls.length > 0) {
      await cleanupManagedUploads(imageUrls, { excludePortfolioProjectId: id })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar proyecto portfolio:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}