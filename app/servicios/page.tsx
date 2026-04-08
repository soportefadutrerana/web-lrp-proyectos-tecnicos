import AnimatedSection from '@/components/animated-section'
import { ArrowRight, Building2, Check, ClipboardCheck, Factory, FileText, HardHat, Leaf, UserCheck, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
                Cobertura tecnica integral para todas las fases del proyecto: diseno, calculo, tramitacion, direccion y certificacion.
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
              Ofrecemos un portfolio completo de servicios técnicos especializados para todas las fases de su proyecto, desde el diseño hasta la certificación final.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="space-y-10 lg:space-y-12">
            {services?.map?.((service, index) => (
              <AnimatedSection key={index}>
                <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}>
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
                      <service.icon className="w-6 h-6 text-gold" />
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
