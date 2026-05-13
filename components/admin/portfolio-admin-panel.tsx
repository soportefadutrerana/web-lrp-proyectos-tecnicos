'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ArrowDown, ArrowUp, Eye, Image as ImageIcon, Pencil, Plus, Trash2, Upload, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react'

type PortfolioProject = {
  id: number
  titulo: string
  slug: string
  categoria: string
  ubicacion: string
  anio: number
  descripcion: string
  imagenPrincipal: string
  imagenes: string[]
  destacado: boolean
  publicado: boolean
  orden: number
}

type FormState = {
  titulo: string
  slug: string
  categoria: string
  ubicacion: string
  anio: string
  descripcion: string
  imagenPrincipal: string
  imagenes: string
  destacado: boolean
  publicado: boolean
  orden: string
}

type PortfolioFormErrors = Partial<Record<keyof FormState, string>>

type LoadProjectsOptions = {
  preserveMessage?: boolean
}

const emptyForm: FormState = {
  titulo: '',
  slug: '',
  categoria: '',
  ubicacion: '',
  anio: new Date().getFullYear().toString(),
  descripcion: '',
  imagenPrincipal: '',
  imagenes: '',
  destacado: false,
  publicado: true,
  orden: '1',
}

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

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

function validatePortfolioForm(form: FormState): PortfolioFormErrors {
  const errors: PortfolioFormErrors = {}
  const titulo = form.titulo.trim()
  const slug = form.slug.trim()
  const categoria = form.categoria.trim()
  const ubicacion = form.ubicacion.trim()
  const descripcion = form.descripcion.trim()
  const imagenPrincipal = form.imagenPrincipal.trim()
  const anio = Number(form.anio)
  const orden = Number(form.orden)
  const maxYear = new Date().getFullYear() + 1
  const imagenes = form.imagenes
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  if (titulo.length < 3 || titulo.length > 160) {
    errors.titulo = 'El título debe tener entre 3 y 160 caracteres.'
  }

  if (slug && !slugRegex.test(slug)) {
    errors.slug = 'El slug solo puede contener minúsculas, números y guiones.'
  }

  if (categoria.length < 2 || categoria.length > 80) {
    errors.categoria = 'La categoría debe tener entre 2 y 80 caracteres.'
  }

  if (ubicacion.length < 2 || ubicacion.length > 120) {
    errors.ubicacion = 'La ubicación debe tener entre 2 y 120 caracteres.'
  }

  if (!Number.isInteger(anio) || anio < 1900 || anio > maxYear) {
    errors.anio = `El año debe estar entre 1900 y ${maxYear}.`
  }

  if (descripcion.length < 20 || descripcion.length > 8000) {
    errors.descripcion = 'La descripción debe tener entre 20 y 8000 caracteres.'
  }

  if (!isValidResourceReference(imagenPrincipal)) {
    errors.imagenPrincipal = 'La imagen principal debe ser una URL válida o una ruta interna.'
  }

  if (imagenes.length > 30) {
    errors.imagenes = 'Solo se permiten hasta 30 imágenes secundarias.'
  }

  if (imagenes.some((item) => !isValidResourceReference(item))) {
    errors.imagenes = 'Todas las imágenes secundarias deben ser URLs válidas o rutas internas.'
  }

  if (!Number.isInteger(orden) || orden < 1 || orden > 9999) {
    errors.orden = 'La posición debe ser un número entero entre 1 y 9999.'
  }

  return errors
}

function sortProjectsByDisplayOrder(projects: PortfolioProject[]) {
  return [...projects].sort((a, b) => {
    if (a.destacado !== b.destacado) {
      return a.destacado ? -1 : 1
    }

    if (a.orden !== b.orden) {
      return a.orden - b.orden
    }

    return b.id - a.id
  })
}

function getAvailableOrderPositions(
  projects: PortfolioProject[],
  editingId: number | null,
  isFeatured: boolean
) {
  const otherProjects = sortProjectsByDisplayOrder(
    projects.filter((project) => project.id !== editingId)
  )
  const featuredCount = otherProjects.filter((project) => project.destacado).length
  const totalCount = otherProjects.length + 1

  if (isFeatured) {
    return Array.from({ length: featuredCount + 1 }, (_, index) => index + 1)
  }

  const firstRegularPosition = featuredCount + 1
  return Array.from(
    { length: totalCount - featuredCount },
    (_, index) => firstRegularPosition + index
  )
}

function normalizeOrderValue(value: string, positions: number[]) {
  if (positions.length === 0) {
    return '1'
  }

  const parsedValue = Number(value)
  const minPosition = positions[0]
  const maxPosition = positions[positions.length - 1]

  if (!Number.isInteger(parsedValue)) {
    return String(maxPosition)
  }

  return String(Math.min(Math.max(parsedValue, minPosition), maxPosition))
}

function normalizeForm(project?: PortfolioProject | null, position?: number): FormState {
  if (!project) {
    return emptyForm
  }

  return {
    titulo: project.titulo ?? '',
    slug: project.slug ?? '',
    categoria: project.categoria ?? '',
    ubicacion: project.ubicacion ?? '',
    anio: String(project.anio ?? new Date().getFullYear()),
    descripcion: project.descripcion ?? '',
    imagenPrincipal: project.imagenPrincipal ?? '',
    imagenes: (project.imagenes ?? []).join('\n'),
    destacado: Boolean(project.destacado),
    publicado: Boolean(project.publicado),
    orden: String(position ?? project.orden ?? 1),
  }
}

export default function PortfolioAdminPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [movingId, setMovingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [formErrors, setFormErrors] = useState<PortfolioFormErrors>({})
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const orderedProjects = useMemo(
    () => sortProjectsByDisplayOrder(projects),
    [projects]
  )

  const projectPositions = useMemo(
    () => new Map(orderedProjects.map((project, index) => [project.id, index + 1])),
    [orderedProjects]
  )

  const editingProject = useMemo(
    () => projects.find((project) => project.id === editingId) ?? null,
    [projects, editingId]
  )

  const featuredCount = useMemo(
    () => orderedProjects.filter((project) => project.destacado).length,
    [orderedProjects]
  )

  const availableOrderPositions = useMemo(
    () => getAvailableOrderPositions(projects, editingId, form.destacado),
    [projects, editingId, form.destacado]
  )

  const normalizedFormOrder = useMemo(
    () => normalizeOrderValue(form.orden, availableOrderPositions),
    [form.orden, availableOrderPositions]
  )

  const orderHelpText = useMemo(() => {
    if (form.destacado) {
      const maxFeaturedPosition = availableOrderPositions[availableOrderPositions.length - 1] ?? 1

      return maxFeaturedPosition === 1
        ? 'Los proyectos destacados siempre van primero. Este ocupará la posición 1.'
        : `Los proyectos destacados siempre van primero. Puedes elegir entre las posiciones 1 y ${maxFeaturedPosition}.`
    }

    const firstRegularPosition = availableOrderPositions[0] ?? 1

    return firstRegularPosition > 1
      ? `Los ${firstRegularPosition - 1} proyectos destacados quedan delante, así que este proyecto empieza a partir de la posición ${firstRegularPosition}.`
      : 'Ahora mismo este proyecto puede ocupar cualquier posición disponible.'
  }, [availableOrderPositions, form.destacado])

  const getProjectPosition = (projectId: number) =>
    projectPositions.get(projectId) ?? 1

  const canMoveProjectUp = (project: PortfolioProject) => {
    const currentPosition = getProjectPosition(project.id)
    const minPosition = project.destacado ? 1 : featuredCount + 1

    return currentPosition > minPosition
  }

  const canMoveProjectDown = (project: PortfolioProject) => {
    const currentPosition = getProjectPosition(project.id)
    const maxPosition = project.destacado ? featuredCount : orderedProjects.length

    return currentPosition < maxPosition
  }

  const canMarkAsFeatured =
    featuredCount < 2 || Boolean(editingProject?.destacado)

  useEffect(() => {
    if (status === 'authenticated') {
      void loadProjects()
    }
  }, [status])

  useEffect(() => {
    const shouldOpenCreate = searchParams.get('new') === '1'

    if (shouldOpenCreate) {
      openCreateDialog()
      router.replace('/admin/portfolio')
    }
  }, [searchParams, router])

  useEffect(() => {
    if (editingProject) {
      const currentPosition = projectPositions.get(editingProject.id) ?? 1
      setForm(normalizeForm(editingProject, currentPosition))
    }
  }, [editingProject, projectPositions])

  useEffect(() => {
    if (normalizedFormOrder !== form.orden) {
      setForm((current) => ({ ...current, orden: normalizedFormOrder }))
    }
  }, [form.orden, normalizedFormOrder])

  async function loadProjects(options?: LoadProjectsOptions) {
    setLoading(true)

    if (!options?.preserveMessage) {
      setMessage('')
    }

    const response = await fetch('/api/admin/portfolio', {
      cache: 'no-store',
    })

    if (!response.ok) {
      setLoading(false)
      setMessage('No se pudieron cargar los proyectos.')
      return
    }

    const payload = await response.json()
    setProjects(
      sortProjectsByDisplayOrder(Array.isArray(payload?.data) ? payload.data : [])
    )
    setLoading(false)
  }

  function openCreateDialog() {
    setEditingId(null)
    setForm(emptyForm)
    setFormErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(project: PortfolioProject) {
    setEditingId(project.id)
    setForm(normalizeForm(project, getProjectPosition(project.id)))
    setFormErrors({})
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setFormErrors({})
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const nextForm = { ...form, orden: normalizedFormOrder }
    const validationErrors = validatePortfolioForm(nextForm)
    setFormErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const requestedOrder = Number(normalizedFormOrder)

    if (!availableOrderPositions.includes(requestedOrder)) {
      setFormErrors((current) => ({
        ...current,
        orden: form.destacado
          ? 'Los proyectos destacados solo pueden ocupar las primeras posiciones.'
          : 'Los proyectos no destacados deben colocarse después de los destacados.',
      }))
      return
    }

    setSaving(true)

    if (form.destacado && !canMarkAsFeatured) {
      setSaving(false)
      setMessage('Solo pueden existir 2 proyectos destacados como máximo.')
      return
    }

    try {
      const payload = {
        titulo: form.titulo.trim(),
        slug: form.slug.trim(),
        categoria: form.categoria.trim(),
        ubicacion: form.ubicacion.trim(),
        anio: Number(form.anio),
        descripcion: form.descripcion.trim(),
        imagenPrincipal: form.imagenPrincipal.trim(),
        imagenes: form.imagenes
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        destacado: form.destacado,
        publicado: form.publicado,
        orden: requestedOrder,
      }

      const response = await fetch(
        editingId ? `/api/admin/portfolio/${editingId}` : '/api/admin/portfolio',
        {
          method: editingId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        setMessage(result?.error ?? 'No se pudo guardar el proyecto.')
        return
      }

      closeDialog()
      await loadProjects({ preserveMessage: true })
      setMessage(editingId ? 'Proyecto actualizado correctamente.' : 'Proyecto creado correctamente.')
      router.refresh()
    } catch {
      setMessage('No se pudo guardar el proyecto. Revise su conexión e inténtelo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  async function moveProject(project: PortfolioProject, direction: 'up' | 'down') {
    const currentPosition = getProjectPosition(project.id)
    const nextPosition = direction === 'up' ? currentPosition - 1 : currentPosition + 1

    if (direction === 'up' && !canMoveProjectUp(project)) {
      return
    }

    if (direction === 'down' && !canMoveProjectDown(project)) {
      return
    }

    try {
      setMovingId(project.id)
      setMessage('')

      const response = await fetch(`/api/admin/portfolio/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orden: nextPosition }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        setMessage(result?.error ?? 'No se pudo actualizar la posición del proyecto.')
        return
      }

      await loadProjects({ preserveMessage: true })
      setMessage('Posición actualizada correctamente.')
      router.refresh()
    } catch {
      setMessage('No se pudo actualizar la posición del proyecto.')
    } finally {
      setMovingId(null)
    }
  }

  async function deleteProject(id: number) {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este proyecto?')
    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setMessage('')

      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        setMessage('No se pudo eliminar el proyecto.')
        return
      }

      await loadProjects({ preserveMessage: true })
      setMessage('Proyecto eliminado correctamente.')
      router.refresh()
    } finally {
      setDeletingId(null)
    }
  }

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) {
      return [] as string[]
    }

    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result?.error ?? 'No se pudieron subir los archivos')
    }

    return Array.isArray(result?.urls) ? result.urls : []
  }

  async function handleMainFileUpload(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploadingMain(true)
      setMessage('')
      const urls = await uploadFiles(event.target.files)

      if (urls[0]) {
        setForm((current) => ({ ...current, imagenPrincipal: urls[0] }))
        setMessage('Imagen principal subida correctamente.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error al subir imagen principal.')
    } finally {
      setUploadingMain(false)
      event.target.value = ''
    }
  }

  async function handleGalleryUpload(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploadingGallery(true)
      setMessage('')
      const urls = await uploadFiles(event.target.files)

      if (urls.length > 0) {
        setForm((current) => {
          const existing = current.imagenes
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean)
          const combined = [...existing, ...urls]

          return { ...current, imagenes: combined.join('\n') }
        })
        setMessage('Imágenes secundarias subidas correctamente.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error al subir imágenes secundarias.')
    } finally {
      setUploadingGallery(false)
      event.target.value = ''
    }
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-4 rounded-[1.75rem] border border-charcoal/10 bg-white p-6 sm:p-8 shadow-[0_18px_40px_rgba(13,13,13,0.06)] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold via-gold-light to-gold-dark" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-3">Administración</p>
              <h1 className="font-serif text-4xl text-charcoal mb-3">
                <span className="text-charcoal/60"></span> Portfolio
              </h1>
              <p className="text-charcoal/70 max-w-2xl leading-relaxed">
                Gestiona los proyectos de LRP. En el panel de abjo, puedes crear, editar, eliminar, actualizar, publicar y destacar proyectos.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-transparent p-0 sm:pl-3">
          <Button className="btn-gold w-full gap-2 justify-center rounded-md sm:w-auto" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Nuevo proyecto
          </Button>
        </div>

        {message ? (
          <div className="mb-6 rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal/70">
            {message}
          </div>
        ) : null}

        <div className="rounded-2xl border border-charcoal/10 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Posición</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-charcoal/50">
                    Cargando proyectos...
                  </TableCell>
                </TableRow>
              ) : orderedProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-charcoal/50">
                    No hay proyectos todavía.
                  </TableCell>
                </TableRow>
              ) : (
                orderedProjects.map((project) => {
                  const currentPosition = getProjectPosition(project.id)

                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 overflow-hidden rounded-lg bg-charcoal/5 shrink-0">
                            {project.imagenPrincipal ? (
                              <img
                                src={project.imagenPrincipal}
                                alt={project.titulo}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-charcoal/30">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-charcoal">{project.titulo}</p>
                            <p className="text-xs text-charcoal/45 truncate max-w-[280px]">{project.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="min-w-[3.25rem] rounded-lg border border-charcoal/10 bg-charcoal/5 px-3 py-2 text-center text-sm font-semibold text-charcoal">
                            #{currentPosition}
                          </div>
                          <div className="flex flex-col gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => moveProject(project, 'up')}
                              disabled={movingId === project.id || !canMoveProjectUp(project)}
                              aria-label={`Subir ${project.titulo}`}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => moveProject(project, 'down')}
                              disabled={movingId === project.id || !canMoveProjectDown(project)}
                              aria-label={`Bajar ${project.titulo}`}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{project.categoria}</TableCell>
                      <TableCell>{project.ubicacion}</TableCell>
                      <TableCell>{project.anio}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={project.publicado ? 'default' : 'outline'}>
                            {project.publicado ? 'Publicado' : 'Oculto'}
                          </Badge>
                          {project.destacado ? <Badge variant="outline">Destacado</Badge> : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                            <Link href={`/admin/portfolio/${project.id}`} aria-label="Ver detalle del proyecto">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => openEditDialog(project)}
                            aria-label="Editar proyecto"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-600 hover:text-red-700"
                            onClick={() => deleteProject(project.id)}
                            disabled={deletingId === project.id}
                            aria-label="Eliminar proyecto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5 flex justify-center">
          <Button asChild variant="outline" className="min-w-48 justify-center">
            <Link href="/admin">Volver al panel</Link>
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-charcoal">{editingId ? 'Editar proyecto' : 'Nuevo proyecto'}</DialogTitle>
            <DialogDescription>
              Completa los datos para publicar el proyecto en el portfolio.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Título</span>
              <input
                value={form.titulo}
                onChange={(event) => {
                  setForm((current) => ({ ...current, titulo: event.target.value }))
                  setFormErrors((current) => ({ ...current, titulo: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                minLength={3}
                maxLength={160}
                required
              />
              {formErrors.titulo ? <p className="text-xs text-red-600">{formErrors.titulo}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Slug</span>
              <input
                value={form.slug}
                onChange={(event) => {
                  setForm((current) => ({ ...current, slug: event.target.value }))
                  setFormErrors((current) => ({ ...current, slug: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="se genera automáticamente si lo dejas vacío"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                title="Use minúsculas, números y guiones"
              />
              {formErrors.slug ? <p className="text-xs text-red-600">{formErrors.slug}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Categoría</span>
              <input
                value={form.categoria}
                onChange={(event) => {
                  setForm((current) => ({ ...current, categoria: event.target.value }))
                  setFormErrors((current) => ({ ...current, categoria: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                minLength={2}
                maxLength={80}
                required
              />
              {formErrors.categoria ? <p className="text-xs text-red-600">{formErrors.categoria}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Ubicación</span>
              <input
                value={form.ubicacion}
                onChange={(event) => {
                  setForm((current) => ({ ...current, ubicacion: event.target.value }))
                  setFormErrors((current) => ({ ...current, ubicacion: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                minLength={2}
                maxLength={120}
                required
              />
              {formErrors.ubicacion ? <p className="text-xs text-red-600">{formErrors.ubicacion}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Año</span>
              <input
                type="number"
                value={form.anio}
                onChange={(event) => {
                  setForm((current) => ({ ...current, anio: event.target.value }))
                  setFormErrors((current) => ({ ...current, anio: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                min={1900}
                max={new Date().getFullYear() + 1}
                step={1}
                required
              />
              {formErrors.anio ? <p className="text-xs text-red-600">{formErrors.anio}</p> : null}
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Descripción</span>
              <textarea
                value={form.descripcion}
                onChange={(event) => {
                  setForm((current) => ({ ...current, descripcion: event.target.value }))
                  setFormErrors((current) => ({ ...current, descripcion: undefined }))
                }}
                className="min-h-28 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                minLength={20}
                maxLength={8000}
                required
              />
              {formErrors.descripcion ? <p className="text-xs text-red-600">{formErrors.descripcion}</p> : null}
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Imagen principal</span>
              <input
                value={form.imagenPrincipal}
                onChange={(event) => {
                  setForm((current) => ({ ...current, imagenPrincipal: event.target.value }))
                  setFormErrors((current) => ({ ...current, imagenPrincipal: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Se autocompleta al subir archivo"
                maxLength={500}
                required
              />
              {formErrors.imagenPrincipal ? <p className="text-xs text-red-600">{formErrors.imagenPrincipal}</p> : null}
              <label className="inline-flex items-center gap-2 rounded-md border border-charcoal/15 px-3 py-2 text-sm text-charcoal/70 hover:border-gold cursor-pointer">
                <Upload className="h-4 w-4" />
                {uploadingMain ? 'Subiendo imagen principal...' : 'Subir imagen principal desde tu PC'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleMainFileUpload}
                  className="hidden"
                  disabled={uploadingMain}
                />
              </label>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Imágenes secundarias</span>
              <textarea
                value={form.imagenes}
                onChange={(event) => {
                  setForm((current) => ({ ...current, imagenes: event.target.value }))
                  setFormErrors((current) => ({ ...current, imagenes: undefined }))
                }}
                className="min-h-24 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Se añaden automáticamente al subir archivos (una URL por línea)"
                maxLength={6000}
              />
              {formErrors.imagenes ? <p className="text-xs text-red-600">{formErrors.imagenes}</p> : null}
              <label className="inline-flex items-center gap-2 rounded-md border border-charcoal/15 px-3 py-2 text-sm text-charcoal/70 hover:border-gold cursor-pointer">
                <Upload className="h-4 w-4" />
                {uploadingGallery ? 'Subiendo imágenes secundarias...' : 'Subir imágenes secundarias desde tu PC'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                  disabled={uploadingGallery}
                />
              </label>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Posición</span>
              <select
                value={normalizedFormOrder}
                onChange={(event) => {
                  setForm((current) => ({ ...current, orden: event.target.value }))
                  setFormErrors((current) => ({ ...current, orden: undefined }))
                }}
                className="w-full rounded-md border border-charcoal/15 bg-white px-3 py-2 outline-none focus:border-gold"
              >
                {availableOrderPositions.map((position) => (
                  <option key={position} value={position}>
                    Posición {position}
                  </option>
                ))}
              </select>
              <p className="text-xs text-charcoal/50">{orderHelpText}</p>
              {formErrors.orden ? <p className="text-xs text-red-600">{formErrors.orden}</p> : null}
            </label>

            <div className="space-y-3 pt-8">
              <label className="flex items-center gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={form.destacado}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, destacado: event.target.checked }))
                    setFormErrors((current) => ({ ...current, orden: undefined }))
                  }}
                  disabled={!canMarkAsFeatured && !form.destacado}
                />
                Destacado
              </label>
              {!canMarkAsFeatured && !form.destacado ? (
                <p className="text-xs text-charcoal/50">
                  Ya existen 2 proyectos destacados. Desmarca uno para destacar otro.
                </p>
              ) : null}
              <label className="flex items-center gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={form.publicado}
                  onChange={(event) => setForm((current) => ({ ...current, publicado: event.target.checked }))}
                />
                Publicado
              </label>
            </div>

            <DialogFooter className="md:col-span-2 gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" className="btn-gold" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar proyecto'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
