type ValidationSuccess<T> = {
  success: true
  data: T
}

type ValidationError = {
  success: false
  error: string
}

type ValidationResult<T> = ValidationSuccess<T> | ValidationError

type ValidationMode = 'create' | 'update'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type TeamPayload = {
  nombre?: string
  slug?: string
  puesto?: string
  bio?: string
  fotoUrl?: string
  especialidades?: string[]
  activo?: boolean
  orden?: number
}

export type PortfolioPayload = {
  titulo?: string
  slug?: string
  categoria?: string
  ubicacion?: string
  anio?: number
  descripcion?: string
  imagenPrincipal?: string
  imagenes?: string[]
  destacado?: boolean
  publicado?: boolean
  orden?: number
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  return String(value).trim()
}

function isValidResourceReference(value: string) {
  if (!value) {
    return false
  }

  if (value.startsWith('/')) {
    return true
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validateRequiredString(
  value: string | undefined,
  fieldLabel: string,
  min: number,
  max: number
): ValidationResult<string> {
  if (!value) {
    return { success: false, error: `${fieldLabel} es obligatorio.` }
  }

  if (value.length < min) {
    return { success: false, error: `${fieldLabel} debe tener al menos ${min} caracteres.` }
  }

  if (value.length > max) {
    return { success: false, error: `${fieldLabel} no puede superar ${max} caracteres.` }
  }

  return { success: true, data: value }
}

function validateOptionalString(
  value: string | undefined,
  fieldLabel: string,
  min: number,
  max: number
): ValidationResult<string | undefined> {
  if (value === undefined || value === '') {
    return { success: true, data: undefined }
  }

  if (value.length < min) {
    return { success: false, error: `${fieldLabel} debe tener al menos ${min} caracteres.` }
  }

  if (value.length > max) {
    return { success: false, error: `${fieldLabel} no puede superar ${max} caracteres.` }
  }

  return { success: true, data: value }
}

function validateSlug(value: string | undefined): ValidationResult<string | undefined> {
  if (!value) {
    return { success: true, data: undefined }
  }

  if (!slugRegex.test(value)) {
    return {
      success: false,
      error: 'El slug solo puede contener minúsculas, números y guiones simples.',
    }
  }

  return { success: true, data: value }
}

function validateOrder(value: unknown): ValidationResult<number | undefined> {
  if (value === undefined) {
    return { success: true, data: undefined }
  }

  const order = Number(value)

  if (!Number.isInteger(order) || order < 0 || order > 9999) {
    return {
      success: false,
      error: 'El orden debe ser un número entero entre 0 y 9999.',
    }
  }

  return { success: true, data: order }
}

function validateStringList(value: unknown, fieldLabel: string, maxItems: number): ValidationResult<string[] | undefined> {
  if (value === undefined) {
    return { success: true, data: undefined }
  }

  if (!Array.isArray(value)) {
    return { success: false, error: `${fieldLabel} debe ser una lista.` }
  }

  const normalized = value
    .map((item) => String(item).trim())
    .filter(Boolean)

  if (normalized.length > maxItems) {
    return { success: false, error: `${fieldLabel} no puede contener más de ${maxItems} elementos.` }
  }

  return { success: true, data: normalized }
}

export function validateTeamPayload(payload: unknown, mode: ValidationMode): ValidationResult<TeamPayload> {
  if (!isObject(payload)) {
    return { success: false, error: 'Body inválido.' }
  }

  const nombre = normalizeString(payload.nombre)
  const slug = normalizeString(payload.slug)
  const puesto = normalizeString(payload.puesto)
  const bio = normalizeString(payload.bio)
  const fotoUrl = normalizeString(payload.fotoUrl)
  const activo = payload.activo === undefined ? undefined : Boolean(payload.activo)

  const nombreResult = mode === 'create'
    ? validateRequiredString(nombre, 'El nombre', 2, 120)
    : validateOptionalString(nombre, 'El nombre', 2, 120)
  if (!nombreResult.success) return nombreResult

  const slugResult = validateSlug(slug)
  if (!slugResult.success) return slugResult

  const puestoResult = mode === 'create'
    ? validateRequiredString(puesto, 'El puesto', 2, 120)
    : validateOptionalString(puesto, 'El puesto', 2, 120)
  if (!puestoResult.success) return puestoResult

  const bioResult = mode === 'create'
    ? validateRequiredString(bio, 'La biografía', 20, 5000)
    : validateOptionalString(bio, 'La biografía', 20, 5000)
  if (!bioResult.success) return bioResult

  const photoResult = mode === 'create'
    ? validateRequiredString(fotoUrl, 'La foto de perfil', 2, 500)
    : validateOptionalString(fotoUrl, 'La foto de perfil', 2, 500)
  if (!photoResult.success) return photoResult

  if (photoResult.data && !isValidResourceReference(photoResult.data)) {
    return { success: false, error: 'La foto de perfil debe ser una URL válida o una ruta interna válida.' }
  }

  const especialidadesResult = validateStringList(payload.especialidades, 'Las especialidades', 20)
  if (!especialidadesResult.success) return especialidadesResult

  if (especialidadesResult.data?.some((item) => item.length < 2 || item.length > 80)) {
    return { success: false, error: 'Cada especialidad debe tener entre 2 y 80 caracteres.' }
  }

  const orderResult = validateOrder(payload.orden)
  if (!orderResult.success) return orderResult

  return {
    success: true,
    data: {
      nombre: nombreResult.data,
      slug: slugResult.data,
      puesto: puestoResult.data,
      bio: bioResult.data,
      fotoUrl: photoResult.data,
      especialidades: especialidadesResult.data,
      activo,
      orden: orderResult.data,
    },
  }
}

export function validatePortfolioPayload(payload: unknown, mode: ValidationMode): ValidationResult<PortfolioPayload> {
  if (!isObject(payload)) {
    return { success: false, error: 'Body inválido.' }
  }

  const titulo = normalizeString(payload.titulo)
  const slug = normalizeString(payload.slug)
  const categoria = normalizeString(payload.categoria)
  const ubicacion = normalizeString(payload.ubicacion)
  const descripcion = normalizeString(payload.descripcion)
  const imagenPrincipal = normalizeString(payload.imagenPrincipal)
  const destacado = payload.destacado === undefined ? undefined : Boolean(payload.destacado)
  const publicado = payload.publicado === undefined ? undefined : Boolean(payload.publicado)

  const tituloResult = mode === 'create'
    ? validateRequiredString(titulo, 'El título', 3, 160)
    : validateOptionalString(titulo, 'El título', 3, 160)
  if (!tituloResult.success) return tituloResult

  const slugResult = validateSlug(slug)
  if (!slugResult.success) return slugResult

  const categoriaResult = mode === 'create'
    ? validateRequiredString(categoria, 'La categoría', 2, 80)
    : validateOptionalString(categoria, 'La categoría', 2, 80)
  if (!categoriaResult.success) return categoriaResult

  const ubicacionResult = mode === 'create'
    ? validateRequiredString(ubicacion, 'La ubicación', 2, 120)
    : validateOptionalString(ubicacion, 'La ubicación', 2, 120)
  if (!ubicacionResult.success) return ubicacionResult

  const descripcionResult = mode === 'create'
    ? validateRequiredString(descripcion, 'La descripción', 20, 8000)
    : validateOptionalString(descripcion, 'La descripción', 20, 8000)
  if (!descripcionResult.success) return descripcionResult

  const imageResult = mode === 'create'
    ? validateRequiredString(imagenPrincipal, 'La imagen principal', 2, 500)
    : validateOptionalString(imagenPrincipal, 'La imagen principal', 2, 500)
  if (!imageResult.success) return imageResult

  if (imageResult.data && !isValidResourceReference(imageResult.data)) {
    return { success: false, error: 'La imagen principal debe ser una URL válida o una ruta interna válida.' }
  }

  const imagenesResult = validateStringList(payload.imagenes, 'Las imágenes secundarias', 30)
  if (!imagenesResult.success) return imagenesResult

  if (imagenesResult.data?.some((item) => !isValidResourceReference(item))) {
    return { success: false, error: 'Todas las imágenes secundarias deben ser URLs válidas o rutas internas válidas.' }
  }

  const orderResult = validateOrder(payload.orden)
  if (!orderResult.success) return orderResult

  let anioValue: number | undefined
  if (payload.anio !== undefined) {
    const parsedYear = Number(payload.anio)
    const maxYear = new Date().getFullYear() + 1

    if (!Number.isInteger(parsedYear) || parsedYear < 1900 || parsedYear > maxYear) {
      return { success: false, error: `El año debe estar entre 1900 y ${maxYear}.` }
    }

    anioValue = parsedYear
  } else if (mode === 'create') {
    return { success: false, error: 'El año es obligatorio.' }
  }

  return {
    success: true,
    data: {
      titulo: tituloResult.data,
      slug: slugResult.data,
      categoria: categoriaResult.data,
      ubicacion: ubicacionResult.data,
      anio: anioValue,
      descripcion: descripcionResult.data,
      imagenPrincipal: imageResult.data,
      imagenes: imagenesResult.data,
      destacado,
      publicado,
      orden: orderResult.data,
    },
  }
}