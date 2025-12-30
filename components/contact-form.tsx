'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response?.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setSubmitted(true)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      })
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
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-gray-600 mb-6">
          Gracias por contactarnos. Le responderemos lo antes posible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData?.nombre ?? ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          placeholder="Su nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData?.email ?? ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          placeholder="su.email@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData?.telefono ?? ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          placeholder="+34 XXX XXX XXX"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          value={formData?.mensaje ?? ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
          placeholder="Cuéntenos sobre su proyecto..."
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            Enviar Mensaje <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  )
}
