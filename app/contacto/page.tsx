import AnimatedSection from '@/components/animated-section'
import ContactForm from '@/components/contact-form'
import { getContactInfo } from '@/lib/contact-info.service'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Contacto | LRP Proyectos Técnicos',
  description: 'Contacte con nosotros para su proyecto de arquitectura o ingeniería. Estamos disponibles para atenderle.',
}

export const dynamic = 'force-dynamic'

export default async function Contacto() {
  const contactInfo = await getContactInfo()

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[66vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/8986038/pexels-photo-8986038.jpeg"
            alt="Contacto LRP"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/25 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-18 w-full">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-10 bg-gold" />
                <span className="text-gold text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                  Hablemos · Su Proyecto · Nuestra Solución
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>
                Contacto
              </h1>
              <div className="w-16 h-0.5 bg-gold/70 mb-7" />
              <p className="text-white text-base sm:text-lg max-w-xl font-light leading-relaxed mb-10" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>
                Cuéntenos su necesidad técnica y le responderemos con una propuesta clara, viable y alineada con sus objetivos.
              </p>
              <Link href="#formulario-contacto" className="btn-gold inline-flex items-center gap-2.5">
                Ir al formulario
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-0 overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-[0_18px_40px_rgba(13,13,13,0.08)]">

            {/* Left: Info */}
            <div className="lg:col-span-2 bg-charcoal-900 py-20 px-8 sm:px-10 lg:px-12">
              <AnimatedSection>
                <h2 className="font-serif text-3xl font-bold text-white mb-10 leading-tight">
                  Estamos aquí para ayudarle
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: contactInfo.email,
                      href: `mailto:${contactInfo.email}`,
                    },
                    {
                      icon: Phone,
                      label: 'Teléfono',
                      value: contactInfo.telefono,
                      href: undefined,
                    },
                    {
                      icon: MapPin,
                      label: 'Ubicación',
                      value: contactInfo.ubicacion,
                      href: undefined,
                    },
                    {
                      icon: Clock,
                      label: 'Horario',
                      value: contactInfo.horario,
                      href: undefined,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="w-10 h-10 bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-white text-xs uppercase tracking-widest mb-1" style={{ letterSpacing: '0.15em' }}>
                          {item.label}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="text-cream hover:text-gold transition-colors text-sm">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-cream text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-14 pt-8 border-t border-white/10">
                  <p className="text-white/60 text-xs leading-relaxed">
                    {contactInfo.legalTexto}
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div id="formulario-contacto" className="lg:col-span-3 py-20 px-6 sm:px-8 lg:px-12 bg-cream flex items-center">
              <AnimatedSection delay={0.15} className="w-full">
                <p className="text-gold text-sm sm:text-base font-semibold uppercase tracking-[0.2em] mb-3">Formulario</p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-7 leading-tight">
                  Envíenos un mensaje
                </h2>
                <div className="w-full">
                  <ContactForm initialAsunto="Proyecto nuevo" />
                </div>  
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
