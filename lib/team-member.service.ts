import { prisma } from '@/lib/db'

export type TeamMemberInput = {
  nombre: string
  slug?: string
  puesto: string
  bio: string
  fotoUrl: string
  especialidades?: string[]
  activo?: boolean
  orden?: number
}

export type TeamMemberUpdateInput = Partial<TeamMemberInput>

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export class TeamMemberService {
  async listPublic() {
    return prisma.teamMember.findMany({
      where: { activo: true },
      orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async listAdmin() {
    return prisma.teamMember.findMany({
      orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async getById(id: number) {
    return prisma.teamMember.findUnique({ where: { id } })
  }

  async create(data: TeamMemberInput) {
    const slug = data.slug?.trim() || slugify(data.nombre)

    return prisma.teamMember.create({
      data: {
        nombre: data.nombre,
        slug,
        puesto: data.puesto,
        bio: data.bio,
        fotoUrl: data.fotoUrl,
        especialidades: data.especialidades ?? [],
        activo: data.activo ?? true,
        orden: data.orden ?? 0,
      },
    })
  }

  async update(id: number, data: TeamMemberUpdateInput) {
    const nextSlug = data.slug?.trim() || (data.nombre ? slugify(data.nombre) : undefined)

    return prisma.teamMember.update({
      where: { id },
      data: {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(nextSlug ? { slug: nextSlug } : {}),
        ...(data.puesto !== undefined ? { puesto: data.puesto } : {}),
        ...(data.bio !== undefined ? { bio: data.bio } : {}),
        ...(data.fotoUrl !== undefined ? { fotoUrl: data.fotoUrl } : {}),
        ...(data.especialidades !== undefined ? { especialidades: data.especialidades } : {}),
        ...(data.activo !== undefined ? { activo: data.activo } : {}),
        ...(data.orden !== undefined ? { orden: data.orden } : {}),
      },
    })
  }

  async delete(id: number) {
    return prisma.teamMember.delete({ where: { id } })
  }
}

export const teamMemberService = new TeamMemberService()
