'use client'

import { CheckCircle, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response?.ok) throw new Error('Error al enviar')

      setSubmitted(true)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name ?? '']: e?.target?.value ?? '',
    }))
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-charcoal mb-3">Mensaje Enviado</h3>
        <p className="text-charcoal/55 mb-8 text-sm leading-relaxed">
          Gracias por contactarnos. Le responderemos a la mayor brevedad posible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-gold text-sm font-semibold uppercase tracking-widest hover:text-gold-dark transition-colors"
          style={{ letterSpacing: '0.15em' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const inputClass = `
    w-full bg-transparent border-b border-charcoal/20 px-0 py-2.5
    text-charcoal placeholder:text-charcoal/30 text-sm
    focus:outline-none focus:border-gold transition-colors duration-300
  `

  const labelClass = `
    block text-xs font-semibold uppercase tracking-widest text-charcoal/50 mb-1
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className={labelClass} style={{ letterSpacing: '0.15em' }}>
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            value={formData?.nombre ?? ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="Su nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass} style={{ letterSpacing: '0.15em' }}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData?.email ?? ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="su.email@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="telefono" className={labelClass} style={{ letterSpacing: '0.15em' }}>
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData?.telefono ?? ''}
          onChange={handleChange}
          className={inputClass}
          placeholder="+34 XXX XXX XXX"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass} style={{ letterSpacing: '0.15em' }}>
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          value={formData?.mensaje ?? ''}
          onChange={handleChange}
          className={inputClass + ' resize-none'}
          placeholder="Cuéntenos sobre su proyecto..."
        />
      </div>

      {error && (
        <div className="border border-red-300 text-red-600 p-3 text-xs">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            Enviar Mensaje
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
