import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.()
    const { nombre, email, telefono, asunto, mensaje, adjuntos } = body ?? {}

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email ?? '')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const asuntoText = asunto ? `\n\nMotivo de contacto: ${String(asunto)}` : ''
    const adjuntosArray = Array.isArray(adjuntos) ? adjuntos.filter(Boolean) : []
    const adjuntosText = adjuntosArray.length > 0
      ? `\n\nAdjuntos seleccionados: ${adjuntosArray.join(', ')}`
      : ''

    // Guardar en base de datos
    const contactForm = await prisma?.contactForm?.create?.({
      data: {
        nombre: nombre ?? '',
        email: email ?? '',
        telefono: telefono ?? null,
        mensaje: `${mensaje ?? ''}${asuntoText}${adjuntosText}`,
        estado: 'nuevo',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Formulario enviado correctamente',
        id: contactForm?.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al procesar formulario de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
