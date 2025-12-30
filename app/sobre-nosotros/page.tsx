import Image from 'next/image'
import { CheckCircle, Target, Eye, Award } from 'lucide-react'
import AnimatedSection from '@/components/animated-section'

export const metadata = {
  title: 'Sobre Nosotros | LRP Proyectos Técnicos',
  description: 'Conoce nuestra historia, misión, visión y valores. Más de 15 años de experiencia en arquitectura e ingeniería.',
}

export default function SobreNosotros() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661418218904-86c202e5493d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Equipo profesional"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Comprometidos con la excelencia en cada proyecto desde 2008
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg"
                  alt="Nuestra historia"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
                <p className="text-lg text-gray-600 mb-4">
                  LRP Proyectos Técnicos nace en 2008 con la visión de ofrecer servicios integrales de arquitectura e ingeniería con los más altos estándares de calidad.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  A lo largo de más de 15 años, hemos desarrollado proyectos a nivel nacional e internacional, consolidándonos como referente en el sector de la arquitectura técnica y la ingeniería civil.
                </p>
                <p className="text-lg text-gray-600">
                  Nuestro compromiso con la innovación, la sostenibilidad y la excelencia técnica nos ha permitido crecer continuamente y adaptarnos a las necesidades cambiantes del mercado.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nuestros Principios
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Target className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
                <p className="text-gray-600">
                  Proporcionar soluciones técnicas innovadoras y de calidad en arquitectura e ingeniería, garantizando la satisfacción de nuestros clientes mediante un servicio profesional, personalizado y comprometido con la excelencia.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Eye className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
                <p className="text-gray-600">
                  Ser reconocidos como líderes en el sector de proyectos técnicos y arquitectura a nivel internacional, destacando por nuestra capacidad de innovación, sostenibilidad y compromiso con el desarrollo de proyectos que mejoran la calidad de vida.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Award className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Excelencia técnica y profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Compromiso con la innovación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Sostenibilidad ambiental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Integridad y transparencia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Orientación al cliente</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl font-bold mb-6">Experiencia Internacional</h2>
                <p className="text-lg text-blue-100 mb-6">
                  Nuestra trayectoria nos ha llevado a desarrollar proyectos en más de 25 países, trabajando con clientes de diversos sectores y adaptándonos a normativas y contextos culturales variados.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                    <span className="text-blue-100">Proyectos en Europa, América Latina, África y Medio Oriente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                    <span className="text-blue-100">Experiencia en normativas internacionales y locales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                    <span className="text-blue-100">Equipo multidisciplinar con visión global</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                    <span className="text-blue-100">Colaboración con socios estratégicos internacionales</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
                  alt="Experiencia internacional"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profesionales altamente cualificados comprometidos con la excelencia
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Arquitectos Colegiados',
                description: 'Especialistas en diseño arquitectónico, urbanismo y rehabilitación',
              },
              {
                title: 'Ingenieros Técnicos',
                description: 'Expertos en estructuras, instalaciones y cálculos técnicos',
              },
              {
                title: 'Gestores de Proyecto',
                description: 'Profesionales en planificación, coordinación y control de obras',
              },
            ].map((role, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{role?.title ?? ''}</h3>
                  <p className="text-gray-600">{role?.description ?? ''}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
