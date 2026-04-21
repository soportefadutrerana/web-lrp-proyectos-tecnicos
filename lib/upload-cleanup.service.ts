import { prisma } from '@/lib/db'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

const MANAGED_UPLOAD_PREFIX = '/uploads/portfolio/'

function normalizeUrl(url: string) {
  return url.split('?')[0].split('#')[0]
}

export function isManagedUploadUrl(url: string) {
  if (!url) {
    return false
  }

  const normalized = normalizeUrl(url)
  return normalized.startsWith(MANAGED_UPLOAD_PREFIX)
}

function toAbsolutePublicPath(url: string) {
  const normalized = normalizeUrl(url)

  if (!isManagedUploadUrl(normalized)) {
    return null
  }

  const relativePath = normalized.replace(/^\//, '')
  const absolutePath = path.join(process.cwd(), 'public', relativePath)

  return absolutePath
}

export async function deleteManagedUploadIfOrphan(
  url: string,
  options?: { excludePortfolioProjectId?: number }
) {
  if (!isManagedUploadUrl(url)) {
    return
  }

  const normalized = normalizeUrl(url)

  const [portfolioReferences, teamReferences] = await Promise.all([
    prisma.portfolioProject.count({
      where: {
        ...(options?.excludePortfolioProjectId
          ? { id: { not: options.excludePortfolioProjectId } }
          : {}),
        OR: [
          { imagenPrincipal: normalized },
          { imagenes: { has: normalized } },
        ],
      },
    }),
    prisma.teamMember.count({
      where: { fotoUrl: normalized },
    }),
  ])

  if (portfolioReferences > 0 || teamReferences > 0) {
    return
  }

  const absolutePath = toAbsolutePublicPath(normalized)

  if (!absolutePath) {
    return
  }

  try {
    await unlink(absolutePath)
  } catch (error) {
    if (
      !(
        typeof error === 'object' &&
        error &&
        'code' in error &&
        (error as NodeJS.ErrnoException).code === 'ENOENT'
      )
    ) {
      throw error
    }
  }
}

export async function cleanupManagedUploads(
  urls: string[],
  options?: { excludePortfolioProjectId?: number }
) {
  const uniqueUrls = Array.from(
    new Set(
      urls
        .map((item) => item?.trim())
        .filter((item): item is string => Boolean(item))
    )
  )

  for (const url of uniqueUrls) {
    await deleteManagedUploadIfOrphan(url, options)
  }
}
