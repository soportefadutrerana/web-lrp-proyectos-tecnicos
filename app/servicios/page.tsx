import Image from 'next/image'
import Link from 'next/link'
import { Building2, HardHat, Zap, Leaf, FileText, UserCheck, Factory, ClipboardCheck, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/animated-section'

export const metadata = {
  title: 'Servicios | LRP Proyectos Técnicos',
  description: 'Servicios profesionales de arquitectura, ingeniería, certificación energética, licencias y dirección de obra.',
}

const services = [
  {
    icon: Building2,
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
    title: 'Ingeniería Civil y Estructural',
    description: 'Cálculo de estructuras, cimentaciones y elementos estructurales. Análisis técnico especializado con software de última generación.',
    image: 'https://plus.unsplash.com/premium_photo-1664474927853-900d5ee1fd80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l2aWwlMjBlbmdpbmVlcmluZ3xlbnwwfHwwfHx8MA%3D%3D',
    features: [
      'Cálculo de estructuras de hormigón',
      'Estructuras metálicas',
      'Estudios geotécnicos',
      'Refuerzos estructurales',
    ],
  },
  {
    icon: Zap,
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
    title: 'Certificación Energética',
    description: 'Certificados de eficiencia energética para edificios existentes y de nueva construcción. Auditorías energéticas y propuestas de mejora.',
    image: 'https://plus.unsplash.com/premium_photo-1680206588056-e4b756405f81?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8',
    features: [
      'Certificados energéticos',
      'Auditorías energéticas',
      'Planes de mejora energética',
      'Estudios de sostenibilidad',
    ],
  },
  {
    icon: FileText,
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
    title: 'Dirección de Obra',
    description: 'Supervisión técnica completa del proceso constructivo. Control de calidad, seguridad y cumplimiento de plazos y presupuestos.',
    image: 'https://plus.unsplash.com/premium_photo-1664299768059-8577ded2de8e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
    features: [
      'Dirección de ejecución',
      'Coordinación de seguridad',
      'Control de calidad',
      'Certificaciones finales de obra',
    ],
  },
  {
    icon: ClipboardCheck,
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Nuestros Servicios</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Soluciones integrales para todas las fases de su proyecto
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-20">
            {services?.map?.((service, index) => (
              <AnimatedSection key={index}>
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={service?.image ?? ''}
                        alt={service?.title ?? ''}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      {service?.icon && <service.icon className="w-12 h-12 text-blue-600" />}
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {service?.title ?? ''}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{service?.description ?? ''}</p>
                    <ul className="space-y-3">
                      {service?.features?.map?.((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature ?? ''}</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Necesita más información?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Nuestro equipo está preparado para asesorarle en su proyecto
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contactar Ahora <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
