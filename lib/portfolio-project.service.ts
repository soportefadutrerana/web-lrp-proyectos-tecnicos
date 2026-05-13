import { Prisma, type PortfolioProject } from '@prisma/client'

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

const TEMPORARY_ORDER_OFFSET = 100000

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function compareProjects(a: PortfolioProject, b: PortfolioProject) {
  if (a.destacado !== b.destacado) {
    return a.destacado ? -1 : 1
  }

  if (a.orden !== b.orden) {
    return a.orden - b.orden
  }

  if (a.createdAt.getTime() !== b.createdAt.getTime()) {
    return b.createdAt.getTime() - a.createdAt.getTime()
  }

  return a.id - b.id
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getOrderedProjectIds(
  projects: PortfolioProject[],
  currentProject: PortfolioProject,
  requestedOrder?: number
) {
  const orderedProjects = [...projects].sort(compareProjects)
  const featuredProjects = orderedProjects.filter((project) => project.destacado)
  const regularProjects = orderedProjects.filter((project) => !project.destacado)

  if (currentProject.destacado) {
    const maxFeaturedPosition = featuredProjects.length + 1
    const nextPosition = clamp(requestedOrder ?? maxFeaturedPosition, 1, maxFeaturedPosition)

    featuredProjects.splice(nextPosition - 1, 0, currentProject)
    return [...featuredProjects, ...regularProjects].map((project) => project.id)
  }

  const firstRegularPosition = featuredProjects.length + 1
  const maxRegularPosition = featuredProjects.length + regularProjects.length + 1
  const nextPosition = clamp(
    requestedOrder ?? maxRegularPosition,
    firstRegularPosition,
    maxRegularPosition
  )
  const regularIndex = nextPosition - firstRegularPosition

  regularProjects.splice(regularIndex, 0, currentProject)

  return [...featuredProjects, ...regularProjects].map((project) => project.id)
}

async function applyProjectOrder(
  tx: Prisma.TransactionClient,
  orderedProjectIds: number[]
) {
  if (orderedProjectIds.length === 0) {
    return
  }

  await Promise.all(
    orderedProjectIds.map((projectId, index) =>
      tx.portfolioProject.update({
        where: { id: projectId },
        data: { orden: TEMPORARY_ORDER_OFFSET + index + 1 },
      })
    )
  )

  await Promise.all(
    orderedProjectIds.map((projectId, index) =>
      tx.portfolioProject.update({
        where: { id: projectId },
        data: { orden: index + 1 },
      })
    )
  )
}

export class PortfolioProjectService {
  async listPublic() {
    return prisma.portfolioProject.findMany({
      where: { publicado: true },
      orderBy: [{ destacado: 'desc' }, { orden: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async listFeaturedPublic(limit = 2) {
    return prisma.portfolioProject.findMany({
      where: { publicado: true, destacado: true },
      orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    })
  }

  async countFeatured(excludeId?: number) {
    return prisma.portfolioProject.count({
      where: {
        destacado: true,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
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

    return prisma.$transaction(async (tx) => {
      const project = await tx.portfolioProject.create({
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
          orden: TEMPORARY_ORDER_OFFSET,
        },
      })

      const existingProjects = await tx.portfolioProject.findMany({
        where: { id: { not: project.id } },
      })

      const orderedProjectIds = getOrderedProjectIds(existingProjects, project, data.orden)

      await applyProjectOrder(tx, orderedProjectIds)

      return tx.portfolioProject.findUniqueOrThrow({
        where: { id: project.id },
      })
    })
  }

  async update(id: number, data: PortfolioProjectUpdateInput) {
    const nextSlug = data.slug?.trim() || (data.titulo ? slugify(data.titulo) : undefined)

    return prisma.$transaction(async (tx) => {
      const currentProject = await tx.portfolioProject.findUnique({ where: { id } })

      if (!currentProject) {
        throw new Error('Proyecto no encontrado')
      }

      const project = await tx.portfolioProject.update({
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
          orden: TEMPORARY_ORDER_OFFSET,
        },
      })

      const existingProjects = await tx.portfolioProject.findMany({
        where: { id: { not: id } },
      })

      const orderedProjectIds = getOrderedProjectIds(
        existingProjects,
        project,
        data.orden ?? currentProject.orden
      )

      await applyProjectOrder(tx, orderedProjectIds)

      return tx.portfolioProject.findUniqueOrThrow({
        where: { id },
      })
    })
  }

  async delete(id: number) {
    return prisma.$transaction(async (tx) => {
      const deletedProject = await tx.portfolioProject.delete({ where: { id } })
      const remainingProjects = await tx.portfolioProject.findMany()
      const orderedProjectIds = [...remainingProjects].sort(compareProjects).map((project) => project.id)

      await applyProjectOrder(tx, orderedProjectIds)

      return deletedProject
    })
  }
}

export const portfolioProjectService = new PortfolioProjectService()
