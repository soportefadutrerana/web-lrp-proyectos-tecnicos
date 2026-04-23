import { validatePortfolioPayload } from '@/lib/admin-api-validation'
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

    const validation = validatePortfolioPayload(body, 'update')

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const data = validation.data

    const existingProject = await portfolioProjectService.getAdminById(id)

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    if (data.destacado !== undefined) {
      const wantsFeatured = Boolean(data.destacado)

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
      data.imagenPrincipal !== undefined
        ? String(data.imagenPrincipal)
        : existingProject.imagenPrincipal

    const nextGalleryImages = Array.isArray(data.imagenes)
      ? data.imagenes.map((item: unknown) => String(item))
      : existingProject.imagenes

    const previousImageUrls = [existingProject.imagenPrincipal, ...(existingProject.imagenes ?? [])]
    const nextImageSet = new Set([nextMainImage, ...nextGalleryImages])
    const removedImageUrls = previousImageUrls.filter((url) => !nextImageSet.has(url))

    const project = await portfolioProjectService.update(id, {
      titulo: data.titulo,
      slug: data.slug,
      categoria: data.categoria,
      ubicacion: data.ubicacion,
      anio: data.anio,
      descripcion: data.descripcion,
      imagenPrincipal: data.imagenPrincipal,
      imagenes: data.imagenes,
      destacado: data.destacado,
      publicado: data.publicado,
      orden: data.orden,
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