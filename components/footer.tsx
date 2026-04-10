'use client'

import { ArrowUpRight, Check, Facebook, Instagram, Linkedin, LogOut, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const services = [
  'Proyectos de Arquitectura',
  'Ingeniería Civil',
  'Certificación Energética',
  'Licencias de Actividad',
  'Dirección de Obra',
  'Estudios Técnicos',
]

export default function Footer() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const isAdmin = Boolean(session?.user)

  function handleAdminAccess() {
    if (isAdmin) {
      setIsLogoutOpen(true)
      return
    }

    router.push('/admin/login')
  }

  async function handleLogout() {
    setIsLogoutOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Gold top line */}
      <div className="h-px bg-gold/60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="relative w-52 h-14 mb-6">
              <Image
                src="/logo_proyectos_tecnicos.png"
                alt="LRP Proyectos Técnicos"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Especialistas en arquitectura, proyectos técnicos e ingeniería con presencia nacional e internacional desde 2008.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gold" />
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/contacto', label: 'Contacto' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gold" />
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/servicios"
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-gold" />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@lrpproyectostecnicos.com"
                  className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40 group-hover:text-gold" />
                  <span className="text-sm">info@lrpproyectostecnicos.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span className="text-sm">+34 XXX XXX XXX</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span className="text-sm">España</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/contacto?modo=presupuesto"
                className="inline-flex items-center gap-2 btn-outline-gold text-xs"
              >
                Solicitar Presupuesto
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date()?.getFullYear?.()} LRP Proyectos Técnicos. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-white/20 text-xs">
              Arquitectura · Ingeniería · Innovación
            </p>
            <button
              type="button"
              onClick={handleAdminAccess}
              aria-label={isAdmin ? 'Cerrar sesión de administrador' : 'Acceso administrador'}
              title={isAdmin ? 'Cerrar sesión de administrador' : 'Acceso administrador'}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                isAdmin
                  ? 'border-white/20 bg-white/5 text-white/55 hover:border-white/35 hover:text-white/80'
                  : 'border-white/10 bg-white/5 text-white/18 hover:border-gold/50 hover:text-white/55'
              }`}
            >
              {status === 'loading' ? (
                <span className="h-2.5 w-2.5 rounded-full border border-white/35 border-t-transparent animate-spin" />
              ) : isAdmin ? (
                <Check className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <span className="h-2 w-2 rounded-full bg-current" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="border-white/10 bg-charcoal-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Cerrar sesi&oacute;n de administrador</DialogTitle>
            <DialogDescription className="text-white/60">
              Vas a salir de la sesi&oacute;n actual. Si contin&uacute;as, volver&aacute;s al estado p&uacute;blico.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={() => setIsLogoutOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 px-4 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-gold inline-flex h-10 items-center justify-center gap-2 px-4 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesi&oacute;n
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
