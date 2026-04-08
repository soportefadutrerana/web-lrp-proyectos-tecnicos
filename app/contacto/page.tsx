import AnimatedSection from '@/components/animated-section'
import ContactForm from '@/components/contact-form'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Contacto | LRP Proyectos Técnicos',
  description: 'Contacte con nosotros para su proyecto de arquitectura o ingeniería. Estamos disponibles para atenderle.',
}

export default function Contacto() {
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
                Contacto
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
                Cuentenos su necesidad tecnica y le responderemos con una propuesta clara, viable y alineada con sus objetivos.
              </p>
              <Link href="#formulario-contacto" className="btn-gold inline-flex items-center gap-2">
                Ir al formulario
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-0">

            {/* Left: Info */}
            <div className="lg:col-span-2 bg-charcoal py-20 px-10 lg:px-12">
              <AnimatedSection>
                <p className="section-label">Información</p>
                <h2 className="font-serif text-3xl font-bold text-white mb-10 leading-tight">
                  Estamos aquí para ayudarle
                </h2>

                <div className="space-y-8">
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
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1" style={{ letterSpacing: '0.15em' }}>
                          {item.label}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="text-white/70 hover:text-gold transition-colors text-sm">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white/70 text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-14 pt-8 border-t border-white/10">
                  <p className="text-white/25 text-xs leading-relaxed">
                    Los datos proporcionados serán almacenados de forma segura y utilizados únicamente para responder a su consulta. Puede solicitar su eliminación en cualquier momento.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div id="formulario-contacto" className="lg:col-span-3 py-20 px-8 lg:px-16 bg-cream">
              <AnimatedSection delay={0.15}>
                <p className="section-label">Formulario</p>
                <h2 className="font-serif text-3xl font-bold text-charcoal mb-10 leading-tight">
                  Envíenos un mensaje
                </h2>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
