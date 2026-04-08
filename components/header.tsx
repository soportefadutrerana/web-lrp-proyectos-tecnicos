'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 60)
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
          ? 'bg-charcoal-900/98 backdrop-blur-md border-b border-white/8 shadow-lg'
          : 'bg-gradient-to-b from-charcoal/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/logo_proyectos_tecnicos.png"
                alt="LRP Proyectos Técnicos"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block text-white font-serif font-bold text-lg tracking-wide">LRP</span>
              <span className="block text-white/50 font-sans text-xs uppercase tracking-widest" style={{ letterSpacing: '0.18em' }}>Proyectos Técnicos</span>
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
                    : 'text-white/70 hover:text-white'
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
              href="/contacto?modo=presupuesto"
              className="ml-6 btn-gold text-xs hover:bg-gold-dark transition-all duration-300 hover:shadow-lg"
            >
              Solicitar Presupuesto
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
                href="/contacto?modo=presupuesto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block btn-gold text-center text-xs hover:bg-gold-dark transition-all duration-300"
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
