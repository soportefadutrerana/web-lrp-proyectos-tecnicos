'use client'

import { CheckCircle, Send } from 'lucide-react'
import { useEffect, useState } from 'react'

const countries = [
  { code: 'ES', name: 'España',            prefix: '+34',  flag: '🇪🇸' },
  { code: 'MX', name: 'México',            prefix: '+52',  flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina',         prefix: '+54',  flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia',          prefix: '+57',  flag: '🇨🇴' },
  { code: 'CL', name: 'Chile',             prefix: '+56',  flag: '🇨🇱' },
  { code: 'PE', name: 'Perú',              prefix: '+51',  flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela',         prefix: '+58',  flag: '🇻🇪' },
  { code: 'EC', name: 'Ecuador',           prefix: '+593', flag: '🇪🇨' },
  { code: 'BO', name: 'Bolivia',           prefix: '+591', flag: '🇧🇴' },
  { code: 'PY', name: 'Paraguay',          prefix: '+595', flag: '🇵🇾' },
  { code: 'UY', name: 'Uruguay',           prefix: '+598', flag: '🇺🇾' },
  { code: 'CR', name: 'Costa Rica',        prefix: '+506', flag: '🇨🇷' },
  { code: 'PA', name: 'Panamá',            prefix: '+507', flag: '🇵🇦' },
  { code: 'DO', name: 'Rep. Dominicana',   prefix: '+1',   flag: '🇩🇴' },
  { code: 'GT', name: 'Guatemala',         prefix: '+502', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras',          prefix: '+504', flag: '🇭🇳' },
  { code: 'SV', name: 'El Salvador',       prefix: '+503', flag: '🇸🇻' },
  { code: 'NI', name: 'Nicaragua',         prefix: '+505', flag: '🇳🇮' },
  { code: 'CU', name: 'Cuba',              prefix: '+53',  flag: '🇨🇺' },
  { code: 'US', name: 'Estados Unidos',    prefix: '+1',   flag: '🇺🇸' },
  { code: 'PT', name: 'Portugal',          prefix: '+351', flag: '🇵🇹' },
  { code: 'FR', name: 'Francia',           prefix: '+33',  flag: '🇫🇷' },
  { code: 'DE', name: 'Alemania',          prefix: '+49',  flag: '🇩🇪' },
  { code: 'IT', name: 'Italia',            prefix: '+39',  flag: '🇮🇹' },
  { code: 'GB', name: 'Reino Unido',       prefix: '+44',  flag: '🇬🇧' },
  { code: 'NL', name: 'Países Bajos',      prefix: '+31',  flag: '🇳🇱' },
  { code: 'BE', name: 'Bélgica',           prefix: '+32',  flag: '🇧🇪' },
  { code: 'CH', name: 'Suiza',             prefix: '+41',  flag: '🇨🇭' },
  { code: 'MA', name: 'Marruecos',         prefix: '+212', flag: '🇲🇦' },
  { code: 'NG', name: 'Nigeria',           prefix: '+234', flag: '🇳🇬' },
  { code: 'AE', name: 'Emiratos Árabes',   prefix: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Arabia Saudí',      prefix: '+966', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar',             prefix: '+974', flag: '🇶🇦' },
]

type ContactFormProps = {
  initialAsunto?: string
}

export default function ContactForm({ initialAsunto = 'Proyecto nuevo' }: ContactFormProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: initialAsunto,
    mensaje: '',
  })
  const [adjuntos, setAdjuntos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      asunto: initialAsunto,
    }))
  }, [initialAsunto])

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)
    setError('')

    try {
      const fd = new FormData()
      fd.append('nombre', formData.nombre)
      fd.append('email', formData.email)
      fd.append('telefono', formData.telefono)
      fd.append('asunto', formData.asunto)
      fd.append('mensaje', formData.mensaje)
      adjuntos.forEach(file => fd.append('adjuntos', file))

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: fd,
      })

      if (!response?.ok) throw new Error('Error al enviar')

      setSubmitted(true)
      setFormData({ nombre: '', email: '', telefono: '', asunto: initialAsunto, mensaje: '' })
      setPhoneNumber('')
      setAdjuntos([])
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name ?? '']: e?.target?.value ?? '',
    }))
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files ?? [])
    setAdjuntos(files)
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
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="w-full grid md:grid-cols-2 gap-6">
        <div className="w-full">
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

        <div className="w-full">
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

      <div className="w-full grid md:grid-cols-2 gap-6">
        <div className="w-full">
          <label className={labelClass} style={{ letterSpacing: '0.15em' }}>
            Teléfono
          </label>
          <div className="flex gap-2 border-b border-charcoal/20 focus-within:border-gold transition-colors duration-300">
            <select
              value={selectedCountry.code}
              onChange={e => {
                const country = countries.find(c => c.code === e.target.value) ?? countries[0]
                setSelectedCountry(country)
                setFormData(prev => ({ ...prev, telefono: phoneNumber ? `${country.prefix} ${phoneNumber}` : '' }))
              }}
              className="bg-transparent text-sm text-charcoal focus:outline-none py-2.5 pr-1 cursor-pointer flex-shrink-0"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.prefix}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="telefono"
              value={phoneNumber}
              onChange={e => {
                const num = e.target.value.replace(/[^\d\s\-()]/g, '')
                setPhoneNumber(num)
                setFormData(prev => ({ ...prev, telefono: num ? `${selectedCountry.prefix} ${num}` : '' }))
              }}
              className="flex-1 bg-transparent py-2.5 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none"
              placeholder="XXX XXX XXX"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="asunto" className={labelClass} style={{ letterSpacing: '0.15em' }}>
            Motivo del Contacto
          </label>
          <select
            id="asunto"
            name="asunto"
            value={formData?.asunto ?? initialAsunto}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Proyecto nuevo">Proyecto nuevo</option>
            <option value="Solicitud de presupuesto">Solicitud de presupuesto</option>
            <option value="Consulta técnica">Consulta técnica</option>
            <option value="Seguimiento de proyecto">Seguimiento de proyecto</option>
            <option value="Duda general">Duda general</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="mensaje" className={labelClass} style={{ letterSpacing: '0.15em' }}>
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={8}
          value={formData?.mensaje ?? ''}
          onChange={handleChange}
          className={inputClass + ' min-h-[220px] resize-y'}
          placeholder="Cuéntenos sobre su proyecto..."
        />
      </div>

      <div>
        <label htmlFor="adjuntos" className={labelClass} style={{ letterSpacing: '0.15em' }}>
          Adjuntar imágenes y/o archivos
        </label>
        <input
          id="adjuntos"
          name="adjuntos"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
          onChange={handleFilesChange}
          className="w-full text-sm text-charcoal/70 file:mr-4 file:rounded-md file:border-0 file:bg-charcoal file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-charcoal-800"
          style={{ letterSpacing: '0.03em' }}
        />
        {adjuntos?.length > 0 && (
          <p className="text-xs text-charcoal/50 mt-2">
            {adjuntos.length} archivo(s) seleccionado(s): {adjuntos.map(file => file.name).join(', ')}
          </p>
        )}
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
