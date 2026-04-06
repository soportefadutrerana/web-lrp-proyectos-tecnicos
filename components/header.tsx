'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

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
          ? 'bg-charcoal-900/98 backdrop-blur-sm border-b border-white/8 shadow-lg'
          : 'bg-gradient-to-b from-charcoal/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
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
            <div className="leading-tight">
              <span className="block text-white font-serif font-bold text-lg tracking-wide">LRP</span>
              <span className="block text-white/60 font-sans text-xs uppercase tracking-widest" style={{ letterSpacing: '0.18em' }}>Proyectos Técnicos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 group ${
                  pathname === item?.href
                    ? 'text-gold'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {item?.label ?? ''}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === item?.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )) ?? null}

            <Link
              href="/contacto"
              className="ml-4 btn-gold text-xs"
            >
              Solicitar Presupuesto
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal-900 border-t border-white/10">
          <nav className="px-6 py-6 space-y-1">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname === item?.href
                    ? 'text-gold border-l-2 border-gold pl-6'
                    : 'text-white/70 hover:text-white hover:border-l-2 hover:border-gold/40 hover:pl-6'
                }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {item?.label ?? ''}
              </Link>
            )) ?? null}
            <div className="pt-4">
              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block btn-gold text-center text-xs"
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
