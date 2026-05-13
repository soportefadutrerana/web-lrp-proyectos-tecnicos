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
    id: 'arquitectura-edificacion',
    emoji: '🏛️',
    title: 'Proyectos de Arquitectura y Edificación',
    description: 'Diseño y desarrollo de proyectos arquitectónicos residenciales, comerciales e institucionales con los más altos estándares técnicos y estéticos.',
    image: 'https://images.pexels.com/photos/19963719/pexels-photo-19963719.jpeg',
    features: [
      'Diseño arquitectónico integral.',
      'Proyectos de nueva construcción y rehabilitación.',
      'Cumplimiento del CTE y normativa urbanística.',
      'Coordinación con ingeniería y instalaciones.',
    ],
  },
  {
    id: 'ingenieria-civil',
    emoji: '🏗️',
    title: 'Ingeniería Civil y Estructural',
    description: 'Cálculo y diseño de estructuras, cimentaciones y obras civiles con software especializado y criterio técnico riguroso.',
    image: 'https://images.pexels.com/photos/5324972/pexels-photo-5324972.jpeg',
    features: [
      'Cálculo de estructuras de hormigón y acero.',
      'Diseño de cimentaciones y muros de contención.',
      'Informes geotécnicos y topográficos.',
      'Proyectos de urbanización y obra civil.',
    ],
  },
  {
    id: 'instalaciones',
    emoji: '⚡',
    title: 'Instalaciones',
    description: 'Proyecto y dirección de instalaciones eléctricas, fontanería, climatización, telecomunicaciones y sistemas de protección contra incendios.',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    features: [
      'Instalaciones eléctricas en BT y MT.',
      'Fontanería, saneamiento y ACS.',
      'Climatización y ventilación (HVAC).',
      'Protección contra incendios y telecomunicaciones.',
    ],
  },
  {
    id: 'direccion-obra',
    emoji: '👷',
    title: 'Dirección de Obra',
    description: 'Supervisión y control técnico del proceso constructivo, garantizando calidad, plazos y cumplimiento del proyecto aprobado.',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
    features: [
      'Dirección facultativa de obra.',
      'Control de calidad y seguridad.',
      'Coordinación con constructora y subcontratas.',
      'Actas, certificaciones y libro de órdenes.',
    ],
  },
  {
    id: 'estudios-tecnicos',
    emoji: '🔍',
    title: 'Estudios Técnicos',
    description: 'Informes periciales, inspecciones técnicas de edificios (ITE/IEE) y estudios de viabilidad para cualquier tipo de inmueble.',
    image: 'https://images.pexels.com/photos/8815847/pexels-photo-8815847.jpeg',
    features: [
      'Informes periciales y valoraciones.',
      'Inspección Técnica de Edificios (ITE/IEE).',
      'Estudios de patología y lesiones.',
      'Viabilidad técnica y económica de proyectos.',
    ],
  },
  {
    id: 'presupuestos-tecnicos',
    emoji: '📐',
    title: 'Elaboración de Presupuestos Técnicos',
    description: 'Cálculo preciso de costes, mediciones de materiales y tiempos estimados para tu obra o reforma.',
    image: 'https://images.pexels.com/photos/8296968/pexels-photo-8296968.jpeg',
    features: [
      'Cálculo de costes de obra, reformas o instalaciones.',
      'Mediciones de materiales y mano de obra.',
      'Tiempos estimados de ejecución.',
    ],
  },
  {
    id: 'control-economico',
    emoji: '💰',
    title: 'Control Económico de Obras',
    description: 'Seguimiento detallado de presupuestos y costes durante la ejecución para garantizar la viabilidad económica del proyecto.',
    image: 'https://images.pexels.com/photos/6289171/pexels-photo-6289171.jpeg',
    features: [
      'Comparación entre presupuesto inicial y coste real.',
      'Certificaciones de obra.',
      'Gestión de modificaciones y extras.',
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
          <div className="absolute inset-0 bg-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/25 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-10 bg-gold" />
                <span className="text-gold text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                  Arquitectura · Ingeniería · Consultoría
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>
                Nuestros Servicios
              </h1>
              <div className="w-16 h-0.5 bg-gold/70 mb-7" />
              <p className="text-white text-base sm:text-lg max-w-xl font-light leading-relaxed mb-10" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>
                Presupuestos, proyectos técnicos, gestión de licencias, control económico y asesoramiento profesional especializado.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2.5">
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
