import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session?.user?.email)
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
}

export async function POST(request: Request) {
  try {
    const isAdmin = await requireAdmin()

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const entries = formData.getAll('files')
    const files = entries.filter((entry): entry is File => entry instanceof File)

    if (!files.length) {
      return NextResponse.json(
        { success: false, error: 'No se recibieron archivos' },
        { status: 400 }
      )
    }

    const uploadDirectory = path.join(process.cwd(), 'public', 'uploads', 'portfolio')
    await mkdir(uploadDirectory, { recursive: true })

    const urls: string[] = []

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          { success: false, error: `Tipo de archivo no permitido: ${file.type}` },
          { status: 400 }
        )
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Archivo demasiado grande: ${file.name}. Máximo 8MB por imagen.`,
          },
          { status: 400 }
        )
      }

      const extension = path.extname(file.name) || '.jpg'
      const safeBaseName = sanitizeFileName(path.basename(file.name, extension)) || 'imagen'
      const fileName = `${Date.now()}-${safeBaseName}${extension}`
      const filePath = path.join(uploadDirectory, fileName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(filePath, buffer)

      urls.push(`/uploads/portfolio/${fileName}`)
    }

    return NextResponse.json({ success: true, urls }, { status: 201 })
  } catch (error) {
    console.error('Error al subir imágenes de portfolio:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}