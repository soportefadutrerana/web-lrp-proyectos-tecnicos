'use client'

import { Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (!result || result.error) {
      setError('Email o contraseña incorrectos')
      return
    }

    router.push(result.url ?? '/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center relative overflow-hidden pt-28 sm:pt-32 pb-8">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,168,76,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,168,76,0.08),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-charcoal-700/95 backdrop-blur-xl border border-gold/40 rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] p-6 sm:p-7">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/45 bg-white/5">
              <Image
                src="/logo_proyectos_tecnicos.png"
                alt="LRP Proyectos Técnicos"
                fill
                className="object-cover scale-110"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-[1.8rem] font-serif font-bold text-white mb-1">Panel Administrador</h1>
            <p className="text-white/70 text-sm">LRP Proyectos Técnicos</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                  className="w-full bg-white border border-charcoal/20 rounded-lg pl-11 pr-4 py-2.5 text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-gold/70 focus:ring-1 focus:ring-gold/45 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/50" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full bg-white border border-charcoal/20 rounded-lg pl-11 pr-4 py-2.5 text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-gold/70 focus:ring-1 focus:ring-gold/45 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-dark hover:to-gold text-charcoal-900 font-bold py-2.5 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-gold/15">
            <p className="text-center text-xs text-white/50">
              Panel de acceso restringido para administradores
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
