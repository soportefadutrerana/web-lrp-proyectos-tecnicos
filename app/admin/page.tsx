import { authOptions } from '@/lib/auth'
import { FolderKanban, PhoneCall, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10 rounded-[2rem] border border-charcoal/10 bg-white p-6 sm:p-8 shadow-[0_18px_45px_rgba(13,13,13,0.06)] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold via-gold-light to-gold-dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-3">Administración</p>
          <h1 className="font-serif text-4xl text-charcoal mb-3">
            <span className="text-charcoal/60">Panel de</span> gestión
          </h1>
          <p className="text-charcoal/70 max-w-3xl leading-relaxed">
            Elige una sección para gestionar el contenido del sitio. El acceso está pensado como un panel claro, directo y acorde al lenguaje visual de la web.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Link href="/admin/portfolio" className="group relative overflow-hidden flex h-full flex-col justify-between rounded-[1.75rem] border border-charcoal/10 bg-white p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_40px_rgba(13,13,13,0.08)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark" />
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold shadow-sm">
                <FolderKanban className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-1">Contenido visual</p>
                <h2 className="font-serif text-2xl text-charcoal mb-1">Portfolio</h2>
                <p className="text-sm text-charcoal/65 max-w-2xl leading-relaxed">
                  Alta, edición, visualización y borrado de proyectos del portfolio.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/admin/equipo" className="group relative overflow-hidden flex h-full flex-col justify-between rounded-[1.75rem] border border-charcoal/10 bg-white p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_40px_rgba(13,13,13,0.08)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark" />
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-1">Personas y perfiles</p>
                <h2 className="font-serif text-2xl text-charcoal mb-1">Equipo y personal</h2>
                <p className="text-sm text-charcoal/65 max-w-2xl leading-relaxed">
                  Gestiona perfiles del equipo técnico y su visibilidad pública.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/admin/contacto" className="group relative overflow-hidden flex h-full flex-col justify-between rounded-[1.75rem] border border-charcoal/10 bg-white p-6 sm:p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_40px_rgba(13,13,13,0.08)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark" />
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold shadow-sm">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-1">Información pública</p>
                <h2 className="font-serif text-2xl text-charcoal mb-1">Datos de contacto</h2>
                <p className="text-sm text-charcoal/65 max-w-2xl leading-relaxed">
                  Edita email, teléfono, ubicación, horario y textos de contacto.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
