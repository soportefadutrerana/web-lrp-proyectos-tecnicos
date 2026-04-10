'use client'

import { signIn } from 'next-auth/react'
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
      setError('Credenciales incorrectas o usuario no autorizado.')
      return
    }

    router.push(result.url ?? '/admin')
    router.refresh()
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-md mx-auto px-6">
        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8">
          <h1 className="font-serif text-3xl text-charcoal mb-2">Acceso Administrador</h1>
          <p className="text-charcoal/60 text-sm mb-6">
            Inicia sesion para gestionar el portfolio de proyectos.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-charcoal/70 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 rounded-md border border-charcoal/20 px-3 text-sm outline-none focus:border-gold"
                placeholder="admin@lrp.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-charcoal/70 mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 rounded-md border border-charcoal/20 px-3 text-sm outline-none focus:border-gold"
                placeholder="••••••••"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full h-11 text-sm disabled:opacity-60"
            >
              {loading ? 'Validando...' : 'Iniciar Sesion'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
