'use client'

import { Menu, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/equipo-tecnico', label: 'Equipo' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 24)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-charcoal-900 border-b border-white/10 shadow-lg'
          : 'bg-charcoal-900 border-b border-white/10 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-[4.5rem] w-[4.5rem] flex-shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:h-20 sm:w-20">
              <Image
                src="/logo_proyectos_tecnicos.png"
                alt="LRP Proyectos Técnicos"
                fill
                className="object-cover scale-[1.18]"
                priority
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block text-white font-serif font-bold text-xl tracking-wide">LRP</span>
              <span className="block text-white/60 font-sans text-[11px] uppercase tracking-widest" style={{ letterSpacing: '0.18em' }}>Proyectos Técnicos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                className={`relative text-xs font-semibold tracking-wider uppercase transition-all duration-300 group ${
                  pathname === item?.href
                    ? 'text-gold'
                    : 'text-white hover:text-gold-light'
                }`}
                style={{ letterSpacing: '0.12em' }}
              >
                {item?.label ?? ''}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    pathname === item?.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )) ?? null}

            <Link
              href={session?.user ? "/admin" : "/contacto"}
              className="ml-6 btn-gold text-xs hover:bg-gold-dark transition-all duration-300 hover:shadow-lg"
            >
              {session?.user ? "Panel Administrador" : "Contacta con nosotros"}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal-900 border-t border-white/10">
          <nav className="px-6 py-8 space-y-2">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded ${
                  pathname === item?.href
                    ? 'text-gold bg-gold/5 border-l-2 border-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={{ letterSpacing: '0.12em' }}
              >
                {item?.label ?? ''}
              </Link>
            )) ?? null}
            <div className="pt-6 border-t border-white/10 mt-6">
              <Link
                href={session?.user ? "/admin" : "/contacto"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block btn-gold text-center text-xs hover:bg-gold-dark transition-all duration-300"
              >
                {session?.user ? "Panel Administrador" : "Contacta con nosotros"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
