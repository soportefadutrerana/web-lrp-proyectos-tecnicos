'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

type ContactInfoData = {
  email: string
  telefono: string
  ubicacion: string
  horario: string
  legalTexto: string
}

const emptyState: ContactInfoData = {
  email: '',
  telefono: '',
  ubicacion: '',
  horario: '',
  legalTexto: '',
}

export default function ContactInfoAdminPanel() {
  const [form, setForm] = useState<ContactInfoData>(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    void loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setMessage('')

    const response = await fetch('/api/admin/contact-info', { cache: 'no-store' })

    if (!response.ok) {
      setLoading(false)
      setMessage('No se pudo cargar la información de contacto.')
      return
    }

    const payload = await response.json()
    setForm(payload?.data ?? emptyState)
    setLoading(false)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/contact-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setMessage(payload?.error ?? 'No se pudo guardar la información de contacto.')
        return
      }

      setForm(payload?.data ?? form)
      setMessage('Datos de contacto actualizados correctamente.')
    } catch {
      setMessage('No se pudo guardar la información de contacto. Revise su conexión e inténtelo de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mb-4 rounded-[1.75rem] border border-charcoal/10 bg-white p-6 sm:p-8 shadow-[0_18px_40px_rgba(13,13,13,0.06)] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold via-gold-light to-gold-dark" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-3">Administración</p>
              <h1 className="font-serif text-4xl text-charcoal mb-3">
                <span className="text-charcoal/60"></span> Datos de contacto
              </h1>
              <p className="text-charcoal/70 max-w-2xl leading-relaxed">
                Edita la información de contacto pública mostrada en la web.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-transparent p-0 sm:pl-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" form="contact-info-form" className="btn-gold w-full rounded-md sm:w-auto" disabled={saving || loading}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </div>

        {message ? (
          <div className="mb-6 rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal/70">
            {message}
          </div>
        ) : null}

        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm">
          {loading ? (
            <p className="text-charcoal/60">Cargando datos de contacto...</p>
          ) : (
            <form id="contact-info-form" className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <label className="space-y-2 md:col-span-1">
                <span className="text-sm font-medium text-charcoal/70">Email público</span>
                <input
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                  required
                />
              </label>

              <label className="space-y-2 md:col-span-1">
                <span className="text-sm font-medium text-charcoal/70">Teléfono</span>
                <input
                  value={form.telefono}
                  onChange={(event) => setForm((current) => ({ ...current, telefono: event.target.value }))}
                  className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                  required
                />
              </label>

              <label className="space-y-2 md:col-span-1">
                <span className="text-sm font-medium text-charcoal/70">Ubicación</span>
                <input
                  value={form.ubicacion}
                  onChange={(event) => setForm((current) => ({ ...current, ubicacion: event.target.value }))}
                  className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                  required
                />
              </label>

              <label className="space-y-2 md:col-span-1">
                <span className="text-sm font-medium text-charcoal/70">Horario</span>
                <input
                  value={form.horario}
                  onChange={(event) => setForm((current) => ({ ...current, horario: event.target.value }))}
                  className="w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                  required
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-charcoal/70">Texto legal</span>
                <textarea
                  value={form.legalTexto}
                  onChange={(event) => setForm((current) => ({ ...current, legalTexto: event.target.value }))}
                  className="min-h-32 w-full rounded-md border border-charcoal/15 px-3 py-2 outline-none focus:border-gold"
                  required
                />
              </label>

            </form>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <Button asChild variant="outline" className="min-w-48 justify-center">
            <Link href="/admin">Volver al panel</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
