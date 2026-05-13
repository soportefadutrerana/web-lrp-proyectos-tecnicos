import AnimatedSection from '@/components/animated-section'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Servicios | LRP Proyectos Técnicos',
  description: 'Servicios profesionales de arquitectura, ingeniería, certificación energética, licencias y dirección de obra.',
}

const services = [
  {
    id: 'presupuestos-tecnicos',
    emoji: '📐',
    title: 'Elaboración de presupuestos técnicos',
    description: 'Cálculo preciso de costes, mediciones de materiales y tiempos estimados para tu obra.',
    image: 'https://images.pexels.com/photos/8296968/pexels-photo-8296968.jpeg',
    features: [
      'Cálculo de costes de obra, reformas o instalaciones.',
      'Mediciones de materiales.',
      'Mano de obra, y tiempos estimados.',
    ],
  },
  {
    id: 'proyectos-tecnicos',
    emoji: '🏗️',
    title: 'Redacción de proyectos técnicos',
    description: 'Documentación técnica completa y planos profesionales para tus proyectos.',
    image: 'https://images.pexels.com/photos/5324972/pexels-photo-5324972.jpeg',
    features: [
      'Memorias técnicas.',
      'Planos.',
      'Documentación para licencias.',
      'Cumplimiento normativo.',
    ],
  },
  {
    id: 'licencias-tramites',
    emoji: '📋',
    title: 'Gestión de licencias y trámites',
    description: 'Tramitación integral de licencias municipales y documentación oficial.',
    image: 'https://images.pexels.com/photos/8482818/pexels-photo-8482818.jpeg',
    features: [
      'Ayuntamientos.',
      'Aperturas de negocios.',
      'Legalizaciones de instalaciones.',
      'Certificados técnicos.',
    ],
  },
  {
    id: 'control-economico',
    emoji: '💰',
    title: 'Control económico de obras',
    description: 'Seguimiento detallado de presupuestos y costes durante la ejecución.',
    image: 'https://images.pexels.com/photos/6289171/pexels-photo-6289171.jpeg',
    features: [
      'Comparación entre presupuesto inicial y coste real.',
      'Certificaciones de obra.',
      'Modificaciones y extras.',
    ],
  },
  {
    id: 'asesoramiento-cliente',
    emoji: '🔍',
    title: 'Asesoramiento al cliente',
    description: 'Orientación técnica y profesional para optimizar tu inversión.',
    image: 'https://images.pexels.com/photos/8815847/pexels-photo-8815847.jpeg',
    features: [
      'Qué opción sale más rentable.',
      'Cómo reducir costes.',
      'Qué materiales convienen.',
    ],
  },
]

export default function Servicios() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg?cs=srgb&dl=pexels-ivan-s-4491829.jpg&fm=jpg"
            alt="Servicios LRP"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/72 to-charcoal/28" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/88 via-charcoal/44 to-charcoal/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(201,168,76,0.14),transparent_42%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.98] mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
                Presupuestos, proyectos técnicos, gestión de licencias, control económico y asesoramiento profesional especializado.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                Solicitar asesoramiento
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-charcoal/60 text-xl leading-relaxed">
              Ofrecemos una cobertura técnica integral especializada en proyectos técnicos, presupuestos, licencias y asesoramiento profesional para todas las fases de su obra.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="space-y-10 lg:space-y-12">
            {services?.map?.((service, index) => (
              <AnimatedSection key={service.id}>
                <div
                  id={service.id}
                  className={`grid scroll-mt-32 md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-charcoal/10 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image
                      src={service?.image ?? ''}
                      alt={service?.title ?? ''}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className={`max-w-xl ${index % 2 === 1 ? 'md:order-1 md:justify-self-start' : 'md:justify-self-end'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">{service.emoji}</span>
                      <div className="h-px flex-1 bg-gold/20" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                      {service?.title ?? ''}
                    </h2>
                    <p className="text-charcoal/60 text-lg mb-8 leading-relaxed max-w-lg">{service?.description ?? ''}</p>
                    <ul className="space-y-3 max-w-lg">
                      {service?.features?.map?.((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-charcoal/75">
                          <Check className="w-4 h-4 text-gold flex-shrink-0" />
                          <span className="text-sm">{feature ?? ''}</span>
                        </li>
                      )) ?? null}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            )) ?? null}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-charcoal py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Necesita más información?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Nuestro equipo está preparado para asesorarle en su proyecto.
            </p>
            <Link
              href="/contacto"
              className="btn-gold inline-flex items-center gap-2"
            >
              Contactar Ahora <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
