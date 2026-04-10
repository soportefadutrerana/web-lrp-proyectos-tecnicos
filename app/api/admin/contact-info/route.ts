import { authOptions } from '@/lib/auth'
import { getContactInfo, saveContactInfo } from '@/lib/contact-info.service'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session?.user?.email)
}

export async function GET() {
  const isAdmin = await requireAdmin()

  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const data = await getContactInfo()
  return NextResponse.json({ success: true, data })
}

export async function PUT(request: Request) {
  const isAdmin = await requireAdmin()

  if (!isAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const email = String(body?.email ?? '').trim()
    const telefono = String(body?.telefono ?? '').trim()
    const ubicacion = String(body?.ubicacion ?? '').trim()
    const horario = String(body?.horario ?? '').trim()
    const legalTexto = String(body?.legalTexto ?? '').trim()

    if (!email || !telefono || !ubicacion || !horario || !legalTexto) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      )
    }

    const saved = await saveContactInfo({
      email,
      telefono,
      ubicacion,
      horario,
      legalTexto,
    })

    return NextResponse.json({ success: true, data: saved })
  } catch {
    return NextResponse.json(
      { error: 'No se pudo guardar la información de contacto.' },
      { status: 500 }
    )
  }
}
