import { getContactInfo } from '@/lib/contact-info.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getContactInfo()
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { error: 'No se pudo obtener la información de contacto.' },
      { status: 500 }
    )
  }
}
