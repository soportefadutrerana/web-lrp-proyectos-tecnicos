import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const nombre  = formData.get('nombre')  as string
    const email   = formData.get('email')   as string
    const telefono = formData.get('telefono') as string | null
    const asunto  = formData.get('asunto')  as string | null
    const mensaje = formData.get('mensaje') as string

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Nombre, email y mensaje son requeridos' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Procesar archivos adjuntos
    const archivos = formData.getAll('adjuntos') as File[]
    const attachments = await Promise.all(
      archivos
        .filter(f => f.size > 0)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer())
          return {
            filename: file.name,
            content: buffer,
            contentType: file.type || 'application/octet-stream',
          }
        })
    )

    const nombresAdjuntos = attachments.map(a => a.filename)

    // Guardar en base de datos
    const contactForm = await prisma.contactForm.create({
      data: {
        nombre,
        email,
        telefono: telefono || null,
        mensaje: `${mensaje}${asunto ? `\n\nMotivo: ${asunto}` : ''}${nombresAdjuntos.length ? `\n\nAdjuntos: ${nombresAdjuntos.join(', ')}` : ''}`,
        estado: 'nuevo',
      },
    })

    // Email de notificación con adjuntos
    await transporter.sendMail({
      from: `"LRP Proyectos Técnicos" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto: ${asunto ?? 'Consulta'} — ${nombre}`,
      attachments,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #C9A84C; font-size: 22px; margin: 0; letter-spacing: 2px;">LRP PROYECTOS TÉCNICOS</h1>
            <p style="color: #ffffff80; font-size: 11px; margin: 8px 0 0; letter-spacing: 3px; text-transform: uppercase;">Nuevo mensaje de contacto</p>
          </div>
          <div style="padding: 40px 32px; background: #fafaf8; border: 1px solid #e8e4df;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; width: 130px;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Nombre</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <strong style="color: #1a1a1a;">${nombre}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Email</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <a href="mailto:${email}" style="color: #C9A84C;">${email}</a>
                </td>
              </tr>
              ${telefono ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Teléfono</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <span style="color: #1a1a1a;">${telefono}</span>
                </td>
              </tr>` : ''}
              ${asunto ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888;">Motivo</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">
                  <span style="color: #1a1a1a;">${asunto}</span>
                </td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 28px;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 10px;">Mensaje</p>
              <div style="background: #fff; border-left: 3px solid #C9A84C; padding: 16px 20px; color: #333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${mensaje}</div>
            </div>
            ${nombresAdjuntos.length ? `
            <div style="margin-top: 20px;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 6px;">Archivos adjuntos (${nombresAdjuntos.length})</p>
              <p style="color: #555; font-size: 13px;">${nombresAdjuntos.join(', ')}</p>
            </div>` : ''}
          </div>
          <div style="padding: 20px 32px; background: #1a1a1a; text-align: center;">
            <p style="color: #ffffff40; font-size: 11px; margin: 0;">lrpproyectostecnicos.com · info@lrpproyectostecnicos.com</p>
          </div>
        </div>
      `,
    })

    // Email de confirmación al cliente
    await transporter.sendMail({
      from: `"LRP Proyectos Técnicos" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Hemos recibido su mensaje — LRP Proyectos Técnicos',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #C9A84C; font-size: 22px; margin: 0; letter-spacing: 2px;">LRP PROYECTOS TÉCNICOS</h1>
          </div>
          <div style="padding: 40px 32px; background: #fafaf8; border: 1px solid #e8e4df;">
            <p style="font-size: 16px; color: #1a1a1a; margin-bottom: 16px;">Estimado/a <strong>${nombre}</strong>,</p>
            <p style="color: #555; line-height: 1.7; margin-bottom: 16px;">Hemos recibido su mensaje correctamente. Nuestro equipo técnico lo revisará y le responderemos a la mayor brevedad posible.</p>
            <p style="color: #555; line-height: 1.7; margin-bottom: 32px;">Si necesita una respuesta urgente, puede contactarnos en <a href="mailto:info@lrpproyectostecnicos.com" style="color: #C9A84C;">info@lrpproyectostecnicos.com</a>.</p>
            <div style="border-top: 1px solid #e8e4df; padding-top: 24px;">
              <p style="color: #888; font-size: 13px; margin: 0;">Atentamente,<br><strong style="color: #1a1a1a;">Equipo LRP Proyectos Técnicos</strong></p>
            </div>
          </div>
          <div style="padding: 20px 32px; background: #1a1a1a; text-align: center;">
            <p style="color: #ffffff40; font-size: 11px; margin: 0;">lrpproyectostecnicos.com · info@lrpproyectostecnicos.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: contactForm.id }, { status: 201 })

  } catch (error) {
    console.error('Error contacto:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
