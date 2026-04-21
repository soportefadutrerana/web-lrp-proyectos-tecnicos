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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'

type TeamMember = {
  id: number
  nombre: string
  slug: string
  puesto: string
  bio: string
  fotoUrl: string
  especialidades: string[]
  activo: boolean
  orden: number
}

type FormState = {
  nombre: string
  slug: string
  puesto: string
  bio: string
  fotoUrl: string
  especialidades: string
  activo: boolean
  orden: string
}

const emptyForm: FormState = {
  nombre: '',
  slug: '',
  puesto: '',
  bio: '',
  fotoUrl: '',
  especialidades: '',
  activo: true,
  orden: '1',
}

function normalizeForm(member?: TeamMember | null): FormState {
  if (!member) {
    return emptyForm
  }

  return {
    nombre: member.nombre,
    slug: member.slug,
    puesto: member.puesto,
    bio: member.bio,
    fotoUrl: member.fotoUrl,
    especialidades: (member.especialidades ?? []).join('\n'),
    activo: member.activo,
    orden: String(member.orden),
  }
}

export default function TeamAdminPanel() {
  const router = useRouter()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState<FormState>(emptyForm)

  useEffect(() => {
    void loadMembers()
  }, [])

  async function loadMembers() {
    setLoading(true)
    setMessage('')

    const response = await fetch('/api/admin/team', { cache: 'no-store' })

    if (!response.ok) {
      setLoading(false)
      setMessage('No se pudo cargar el equipo.')
      return
    }

    const payload = await response.json()
    setMembers(Array.isArray(payload?.data) ? payload.data : [])
    setLoading(false)
  }

  function openCreateDialog() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEditDialog(member: TeamMember) {
    setEditingId(member.id)
    setForm(normalizeForm(member))
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  async function uploadProfilePhoto(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)
      setMessage('')

      const files = event.target.files

      if (!files || files.length === 0) {
        return
      }

      const formData = new FormData()
      formData.append('files', files[0])

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result?.error ?? 'No se pudo subir la imagen')
        return
      }

      const photoUrl = result?.urls?.[0]

      if (photoUrl) {
        setForm((current) => ({ ...current, fotoUrl: photoUrl }))
        setMessage('Foto subida correctamente.')
      }
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    const payload = {
      nombre: form.nombre.trim(),
      slug: form.slug.trim(),
      puesto: form.puesto.trim(),
      bio: form.bio.trim(),
      fotoUrl: form.fotoUrl.trim(),
      especialidades: form.especialidades
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      activo: form.activo,
      orden: Number(form.orden),
    }

    const response = await fetch(editingId ? `/api/admin/team/${editingId}` : '/api/admin/team', {
      method: editingId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      setSaving(false)
      setMessage(result?.error ?? 'No se pudo guardar el miembro.')
      return
    }

    const nextMember = result?.data as TeamMember

    setMembers((current) => {
      const withoutEdited = current.filter((item) => item.id !== nextMember.id)
      return [nextMember, ...withoutEdited].sort((a, b) => a.orden - b.orden)
    })

    setSaving(false)
    closeDialog()
    setMessage(editingId ? 'Miembro actualizado correctamente.' : 'Miembro creado correctamente.')
    router.refresh()
  }

  async function deleteMember(id: number) {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este miembro del equipo?')

    if (!confirmed) {
      return
    }

    setDeletingId(id)
    setMessage('')

    const response = await fetch(`/api/admin/team/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      setDeletingId(null)
      setMessage('No se pudo eliminar el miembro.')
      return
    }

    setMembers((current) => current.filter((member) => member.id !== id))
    setDeletingId(null)
    setMessage('Miembro eliminado correctamente.')
    router.refresh()
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
                <span className="text-charcoal/60"></span> Equipo
              </h1>
              <p className="text-charcoal/70 max-w-2xl leading-relaxed">
                Gestiona los miembros del equipo. Crea, elimina, actualiza y visualice quienes conforman LRP proyectos técnicos.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-transparent p-0 sm:pl-3">
          <Button className="btn-gold w-full gap-2 justify-center rounded-md sm:w-auto" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Nuevo miembro
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
                <TableHead>Miembro</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-charcoal/50">
                    Cargando equipo...
                  </TableCell>
                </TableRow>
              ) : members.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-charcoal/50">
                    No hay miembros en el equipo.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-full bg-charcoal/5 shrink-0 border border-charcoal/10">
                          {member.fotoUrl ? (
                            <img src={member.fotoUrl} alt={member.nombre} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-charcoal/30">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{member.nombre}</p>
                          <p className="text-xs text-charcoal/45 truncate max-w-[280px]">{member.slug}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.puesto}</TableCell>
                    <TableCell>
                      <Badge variant={member.activo ? 'default' : 'outline'}>
                        {member.activo ? 'Activo' : 'Oculto'}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.orden}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                          <Link href={`/admin/equipo/${member.id}`} aria-label="Ver detalle del miembro">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => openEditDialog(member)}
                          aria-label="Editar miembro"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-red-600 hover:text-red-700"
                          onClick={() => deleteMember(member.id)}
                          disabled={deletingId === member.id}
                          aria-label="Eliminar miembro"
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
            <DialogTitle className="text-3xl font-serif text-charcoal">{editingId ? 'Editar miembro' : 'Nuevo miembro'}</DialogTitle>
            <DialogDescription>
              Completa los datos para publicar este perfil en la sección de equipo técnico.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
            <label className="space-y-2">
              <span className="text-sm font-medium text-charcoal/70">Nombre</span>
              <input
                value={form.nombre}
                onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))}
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
                placeholder="se genera automáticamente"
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Puesto</span>
              <input
                value={form.puesto}
                onChange={(event) => setForm((current) => ({ ...current, puesto: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Biografía</span>
              <textarea
                value={form.bio}
                onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
                className="min-h-28 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                required
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Foto de perfil</span>
              <input
                value={form.fotoUrl}
                onChange={(event) => setForm((current) => ({ ...current, fotoUrl: event.target.value }))}
                className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Se autocompleta al subir archivo"
                required
              />
              <label className="inline-flex items-center gap-2 rounded-md border border-charcoal/15 px-3 py-2 text-sm text-charcoal/70 hover:border-gold cursor-pointer">
                <Upload className="h-4 w-4" />
                {uploading ? 'Subiendo foto...' : 'Subir foto desde tu PC'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={uploadProfilePhoto}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-charcoal/70">Especialidades</span>
              <textarea
                value={form.especialidades}
                onChange={(event) => setForm((current) => ({ ...current, especialidades: event.target.value }))}
                className="min-h-24 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                placeholder="Una especialidad por línea"
              />
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
                  checked={form.activo}
                  onChange={(event) => setForm((current) => ({ ...current, activo: event.target.checked }))}
                />
                Activo (visible públicamente)
              </label>
            </div>

            <DialogFooter className="md:col-span-2 gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" className="btn-gold" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar miembro'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
