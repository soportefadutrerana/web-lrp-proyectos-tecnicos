import { prisma } from '@/lib/db'

export type PortfolioProjectInput = {
  titulo: string
  slug?: string
  categoria: string
  ubicacion: string
  anio: number
  descripcion: string
  imagenPrincipal: string
  imagenes?: string[]
  destacado?: boolean
  publicado?: boolean
  orden?: number
}

export type PortfolioProjectUpdateInput = Partial<PortfolioProjectInput>

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export class PortfolioProjectService {
  async listPublic() {
    return prisma.portfolioProject.findMany({
      where: { publicado: true },
      orderBy: [{ destacado: 'desc' }, { orden: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async getPublicBySlug(slug: string) {
    return prisma.portfolioProject.findFirst({
      where: { slug, publicado: true },
    })
  }

  async listAdmin() {
    return prisma.portfolioProject.findMany({
      orderBy: [{ destacado: 'desc' }, { orden: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async getAdminById(id: number) {
    return prisma.portfolioProject.findUnique({ where: { id } })
  }

  async create(data: PortfolioProjectInput) {
    const slug = data.slug?.trim() || slugify(data.titulo)

    return prisma.portfolioProject.create({
      data: {
        titulo: data.titulo,
        slug,
        categoria: data.categoria,
        ubicacion: data.ubicacion,
        anio: data.anio,
        descripcion: data.descripcion,
        imagenPrincipal: data.imagenPrincipal,
        imagenes: data.imagenes ?? [],
        destacado: data.destacado ?? false,
        publicado: data.publicado ?? true,
        orden: data.orden ?? 0,
      },
    })
  }

  async update(id: number, data: PortfolioProjectUpdateInput) {
    const nextSlug = data.slug?.trim() || (data.titulo ? slugify(data.titulo) : undefined)

    return prisma.portfolioProject.update({
      where: { id },
      data: {
        ...(data.titulo !== undefined ? { titulo: data.titulo } : {}),
        ...(nextSlug ? { slug: nextSlug } : {}),
        ...(data.categoria !== undefined ? { categoria: data.categoria } : {}),
        ...(data.ubicacion !== undefined ? { ubicacion: data.ubicacion } : {}),
        ...(data.anio !== undefined ? { anio: data.anio } : {}),
        ...(data.descripcion !== undefined ? { descripcion: data.descripcion } : {}),
        ...(data.imagenPrincipal !== undefined ? { imagenPrincipal: data.imagenPrincipal } : {}),
        ...(data.imagenes !== undefined ? { imagenes: data.imagenes } : {}),
        ...(data.destacado !== undefined ? { destacado: data.destacado } : {}),
        ...(data.publicado !== undefined ? { publicado: data.publicado } : {}),
        ...(data.orden !== undefined ? { orden: data.orden } : {}),
      },
    })
  }

  async delete(id: number) {
    return prisma.portfolioProject.delete({ where: { id } })
  }
}

export const portfolioProjectService = new PortfolioProjectService()