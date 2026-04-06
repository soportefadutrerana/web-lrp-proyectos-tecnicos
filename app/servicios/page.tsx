import Image from 'next/image'
import Link from 'next/link'
import { Building2, HardHat, Zap, Leaf, FileText, UserCheck, Factory, ClipboardCheck, ArrowRight, Check } from 'lucide-react'
import AnimatedSection from '@/components/animated-section'

export const metadata = {
  title: 'Servicios | LRP Proyectos Técnicos',
  description: 'Servicios profesionales de arquitectura, ingeniería, certificación energética, licencias y dirección de obra.',
}

const services = [
  {
    icon: Building2,
    number: '01',
    title: 'Proyectos de Arquitectura y Edificación',
    description: 'Diseño integral de edificaciones residenciales, comerciales e industriales. Proyectos básicos y de ejecución cumpliendo con toda la normativa vigente.',
    image: 'https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg?cs=srgb&dl=pexels-ivan-s-4491829.jpg&fm=jpg',
    features: [
      'Proyectos de obra nueva',
      'Reformas y ampliaciones',
      'Proyectos de rehabilitación',
      'Diseño arquitectónico personalizado',
    ],
  },
  {
    icon: HardHat,
    number: '02',
    title: 'Ingeniería Civil y Estructural',
    description: 'Cálculo de estructuras, cimentaciones y elementos estructurales. Análisis técnico especializado con software de última generación.',
    image: 'https://plus.unsplash.com/premium_photo-1664474927853-900d5ee1fd80?fm=jpg&q=60&w=3000',
    features: [
      'Cálculo de estructuras de hormigón',
      'Estructuras metálicas',
      'Estudios geotécnicos',
      'Refuerzos estructurales',
    ],
  },
  {
    icon: Zap,
    number: '03',
    title: 'Instalaciones',
    description: 'Diseño y proyectos de instalaciones eléctricas, fontanería, climatización, telecomunicaciones y protección contra incendios.',
    image: 'https://images.pexels.com/photos/28942196/pexels-photo-28942196.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-28942196.jpg&fm=jpg',
    features: [
      'Instalaciones eléctricas BT/MT',
      'Fontanería y saneamiento',
      'Climatización y ventilación',
      'Sistemas contra incendios',
    ],
  },
  {
    icon: Leaf,
    number: '04',
    title: 'Certificación Energética',
    description: 'Certificados de eficiencia energética para edificios existentes y de nueva construcción. Auditorías energéticas y propuestas de mejora.',
    image: 'https://plus.unsplash.com/premium_photo-1680206588056-e4b756405f81?fm=jpg&q=60&w=3000',
    features: [
      'Certificados energéticos',
      'Auditorías energéticas',
      'Planes de mejora energética',
      'Estudios de sostenibilidad',
    ],
  },
  {
    icon: FileText,
    number: '05',
    title: 'Licencias de Actividad y Apertura',
    description: 'Tramitación integral de licencias municipales, declaraciones responsables y documentación necesaria para la apertura de negocios.',
    image: 'https://images.pexels.com/photos/8731037/pexels-photo-8731037.jpeg?cs=srgb&dl=pexels-mikhail-nilov-8731037.jpg&fm=jpg',
    features: [
      'Licencias de apertura',
      'Declaraciones responsables',
      'Cambios de titularidad',
      'Asesoramiento normativo',
    ],
  },
  {
    icon: UserCheck,
    number: '06',
    title: 'Dirección de Obra',
    description: 'Supervisión técnica completa del proceso constructivo. Control de calidad, seguridad y cumplimiento de plazos y presupuestos.',
    image: 'https://plus.unsplash.com/premium_photo-1664299768059-8577ded2de8e?fm=jpg&q=60&w=3000',
    features: [
      'Dirección de ejecución',
      'Coordinación de seguridad',
      'Control de calidad',
      'Certificaciones finales de obra',
    ],
  },
  {
    icon: ClipboardCheck,
    number: '07',
    title: 'Estudios Técnicos',
    description: 'Informes periciales, tasaciones, inspecciones técnicas de edificios (ITE) y estudios especializados.',
    image: 'https://images.pexels.com/photos/2451566/pexels-photo-2451566.jpeg?cs=srgb&dl=pexels-proxyclick-2451566.jpg&fm=jpg',
    features: [
      'Informes periciales',
      'ITE (Inspección Técnica Edificios)',
      'Peritaciones judiciales',
      'Estudios de viabilidad',
    ],
  },
  {
    icon: Factory,
    number: '08',
    title: 'Proyectos Industriales',
    description: 'Diseño y desarrollo de proyectos para naves industriales, almacenes y espacios productivos con todas las instalaciones necesarias.',
    image: 'https://images.pexels.com/photos/3769292/pexels-photo-3769292.jpeg?cs=srgb&dl=pexels-timo-volz-837240-3769292.jpg&fm=jpg',
    features: [
      'Naves industriales',
      'Proyectos de actividad',
      'Instalaciones especiales',
      'Adaptaciones normativas',
    ],
  },
]

export default function Servicios() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg?cs=srgb&dl=pexels-ivan-s-4491829.jpg&fm=jpg"
            alt="Servicios LRP"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 w-full">
          <AnimatedSection>
            <p className="section-label">Lo Que Ofrecemos</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Nuestros Servicios
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-charcoal/60 text-xl leading-relaxed">
              Ofrecemos un portfolio completo de servicios técnicos especializados para todas las fases de su proyecto, desde el diseño hasta la certificación final.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="space-y-0 divide-y divide-charcoal/8">
            {services?.map?.((service, index) => (
              <AnimatedSection key={index}>
                <div className={`py-20 grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}>
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image
                      src={service?.image ?? ''}
                      alt={service?.title ?? ''}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Service number overlay */}
                    <div className="absolute top-6 left-6 bg-charcoal/80 backdrop-blur-sm px-4 py-2">
                      <span className="text-gold text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.2em' }}>
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-6">
                      <service.icon className="w-6 h-6 text-gold" />
                      <div className="h-px flex-1 bg-gold/20" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                      {service?.title ?? ''}
                    </h2>
                    <p className="text-charcoal/55 text-lg mb-8 leading-relaxed">{service?.description ?? ''}</p>
                    <ul className="space-y-3">
                      {service?.features?.map?.((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-charcoal/70">
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
