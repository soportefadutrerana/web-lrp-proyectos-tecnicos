import AnimatedSection from '@/components/animated-section'
import ContactForm from '@/components/contact-form'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Contacto | LRP Proyectos Técnicos',
  description: 'Contacte con nosotros para su proyecto de arquitectura o ingeniería. Estamos disponibles para atenderle.',
}

type ContactoPageProps = {
  searchParams?: {
    modo?: string | string[]
  }
}

export default function Contacto({ searchParams }: ContactoPageProps) {
  const modo = Array.isArray(searchParams?.modo) ? searchParams?.modo?.[0] : searchParams?.modo
  const isPresupuestoMode = modo === 'presupuesto'

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[66vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1664299768059-8577ded2de8e?fm=jpg&q=80&w=3000"
            alt="Contacto LRP"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/72 to-charcoal/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-charcoal/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(201,168,76,0.14),transparent_42%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-18 w-full">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.98] mb-6">
                {isPresupuestoMode ? 'Solicitar Presupuesto' : 'Contacto'}
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
                {isPresupuestoMode
                  ? 'Comparta los detalles de su proyecto y le enviaremos una propuesta tecnica y economica adaptada a sus necesidades.'
                  : 'Cuentenos su necesidad tecnica y le responderemos con una propuesta clara, viable y alineada con sus objetivos.'}
              </p>
              <Link href="#formulario-contacto" className="btn-gold inline-flex items-center gap-2">
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
                      value: 'info@lrpproyectostecnicos.com',
                      href: 'mailto:info@lrpproyectostecnicos.com',
                    },
                    {
                      icon: Phone,
                      label: 'Teléfono',
                      value: '+34 XXX XXX XXX',
                      href: undefined,
                    },
                    {
                      icon: MapPin,
                      label: 'Ubicación',
                      value: 'España',
                      href: undefined,
                    },
                    {
                      icon: Clock,
                      label: 'Horario',
                      value: 'Lunes – Viernes: 9:00 – 18:00',
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
                    Los datos proporcionados serán almacenados de forma segura y utilizados únicamente para responder a su consulta. Puede solicitar su eliminación en cualquier momento.
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
                  <ContactForm initialAsunto={isPresupuestoMode ? 'Solicitud de presupuesto' : 'Proyecto nuevo'} />
                </div>  
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
