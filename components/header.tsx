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
      setIsScrolled(window?.scrollY > 50)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-48 h-12">
              <Image
                src="https://cdn.abacus.ai/images/a78bbf89-4e68-4098-8810-e92626f9f67c.png"
                alt="LRP Proyectos Técnicos"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  pathname === item?.href
                    ? 'bg-blue-600 text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {item?.label ?? ''}
              </Link>
            )) ?? null}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems?.map?.((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  pathname === item?.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item?.label ?? ''}
              </Link>
            )) ?? null}
          </nav>
        )}
      </div>
    </header>
  )
}
