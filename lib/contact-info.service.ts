import { promises as fs } from 'fs'
import path from 'path'

export type ContactInfoData = {
  email: string
  telefono: string
  ubicacion: string
  horario: string
  legalTexto: string
}

const filePath = path.join(process.cwd(), 'data', 'contact-info.json')

const defaultContactInfo: ContactInfoData = {
  email: 'info@lrpproyectostecnicos.com',
  telefono: '+34 XXX XXX XXX',
  ubicacion: 'España',
  horario: 'Lunes - Viernes: 9:00 - 18:00',
  legalTexto:
    'Los datos proporcionados serán almacenados de forma segura y utilizados únicamente para responder a su consulta. Puede solicitar su eliminación en cualquier momento.',
}

export async function getContactInfo() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const parsed = JSON.parse(fileContent) as Partial<ContactInfoData>

    return {
      ...defaultContactInfo,
      ...parsed,
    }
  } catch {
    return defaultContactInfo
  }
}

export async function saveContactInfo(nextInfo: ContactInfoData) {
  const sanitized: ContactInfoData = {
    email: nextInfo.email.trim(),
    telefono: nextInfo.telefono.trim(),
    ubicacion: nextInfo.ubicacion.trim(),
    horario: nextInfo.horario.trim(),
    legalTexto: nextInfo.legalTexto.trim(),
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(sanitized, null, 2), 'utf8')

  return sanitized
}
