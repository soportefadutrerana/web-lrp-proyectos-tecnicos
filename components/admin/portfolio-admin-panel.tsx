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
import { Eye, Image as ImageIcon, Pencil, Plus, Trash2, Upload, X } from 'lucide-react'
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
  orden: '0',
}

function normalizeForm(project?: PortfolioProject | null): FormState {
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
    orden: String(project.orden ?? 0),
  }
}

export default function PortfolioAdminPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const editingProject = useMemo(
    () => projects.find((project) => project.id === editingId) ?? null,
    [projects, editingId]
  )

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
      setForm(normalizeForm(editingProject))
    }
  }, [editingProject])

  async function loadProjects() {
    setLoading(true)
    setMessage('')

    const response = await fetch('/api/admin/portfolio', {
      cache: 'no-store',
    })

    if (!response.ok) {
      setLoading(false)
      setMessage('No se pudieron cargar los proyectos.')
      return
    }

    const payload = await response.json()
    setProjects(Array.isArray(payload?.data) ? payload.data : [])
    setLoading(false)
  }

  function openCreateDialog() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEditDialog(project: PortfolioProject) {
    setEditingId(project.id)
    setForm(normalizeForm(project))
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

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
      orden: Number(form.orden),
    }

    const response = await fetch(
      editingId ? `/api/admin/portfolio/${editingId}` : '/api/admin/portfolio',
      {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      setSaving(false)
      setMessage(result?.error ?? 'No se pudo guardar el proyecto.')
      return
    }

    const nextProject = result?.data as PortfolioProject

    setProjects((current) => {
      const withoutEdited = current.filter((item) => item.id !== nextProject.id)
      return [nextProject, ...withoutEdited].sort((a, b) => a.orden - b.orden)
    })

    setSaving(false)
    closeDialog()
    setMessage(editingId ? 'Proyecto actualizado correctamente.' : 'Proyecto creado correctamente.')
    router.refresh()
  }

  async function deleteProject(id: number) {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este proyecto?')
    if (!confirmed) {
      return
    }

    setDeletingId(id)
    setMessage('')

    const response = await fetch(`/api/admin/portfolio/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      setDeletingId(null)
      setMessage('No se pudo eliminar el proyecto.')
      return
    }

    setProjects((current) => current.filter((project) => project.id !== id))
    setDeletingId(null)
    setMessage('Proyecto eliminado correctamente.')
    router.refresh()
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
                  <TableCell colSpan={6} className="py-10 text-center text-charcoal/50">
                    Cargando proyectos...
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-charcoal/50">
                    No hay proyectos todavía.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
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
                ))
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
            <DialogTitle>{editingId ? 'Editar proyecto' : 'Nuevo proyecto'}</DialogTitle>
            <DialogDescription>
              Completa los datos para publicar el proyecto en el portfolio.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Título</span>
              <input
                value={form.titulo}
                onChange={(event) => setForm((current) => ({ ...current, titulo: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Slug</span>
              <input
                value={form.slug}
                onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="se genera automáticamente si lo dejas vacío"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Categoría</span>
              <input
                value={form.categoria}
                onChange={(event) => setForm((current) => ({ ...current, categoria: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Ubicación</span>
              <input
                value={form.ubicacion}
                onChange={(event) => setForm((current) => ({ ...current, ubicacion: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Año</span>
              <input
                type="number"
                value={form.anio}
                onChange={(event) => setForm((current) => ({ ...current, anio: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Descripción</span>
              <textarea
                value={form.descripcion}
                onChange={(event) => setForm((current) => ({ ...current, descripcion: event.target.value }))}
                className="min-h-28 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Imagen principal</span>
              <input
                value={form.imagenPrincipal}
                onChange={(event) => setForm((current) => ({ ...current, imagenPrincipal: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Se autocompleta al subir archivo"
                required
              />
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
                onChange={(event) => setForm((current) => ({ ...current, imagenes: event.target.value }))}
                className="min-h-24 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Se añaden automáticamente al subir archivos (una URL por línea)"
              />
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
              <span className="text-sm font-medium text-charcoal/70">Orden</span>
              <input
                type="number"
                value={form.orden}
                onChange={(event) => setForm((current) => ({ ...current, orden: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
              />
            </label>

            <div className="space-y-3 pt-8">
              <label className="flex items-center gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={form.destacado}
                  onChange={(event) => setForm((current) => ({ ...current, destacado: event.target.checked }))}
                />
                Destacado
              </label>
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
