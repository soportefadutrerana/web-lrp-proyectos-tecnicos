import Image from 'next/image'
import Link from 'next/link'
import { Building2, Ruler, FileCheck, Award, Globe, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/animated-section'
import AnimatedCounter from '@/components/animated-counter'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"
            alt="Arquitectura moderna"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Transformamos <span className="text-blue-400">Ideas</span> en Realidades
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Especialistas en arquitectura, proyectos técnicos e ingeniería con presencia nacional e internacional
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/servicios"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Nuestros Servicios <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contacto"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contactar
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-gray-600">Años de Experiencia</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-gray-600">Proyectos Completados</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-600">Satisfacción</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <p className="text-gray-600">Países</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos soluciones integrales para cada fase de su proyecto
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Proyectos de Arquitectura',
                description: 'Diseño integral de edificaciones residenciales, comerciales e industriales',
              },
              {
                icon: Ruler,
                title: 'Ingeniería Civil',
                description: 'Estructuras, cimentaciones y cálculos técnicos especializados',
              },
              {
                icon: FileCheck,
                title: 'Certificación Energética',
                description: 'Certificados de eficiencia energética para edificios',
              },
              {
                icon: Award,
                title: 'Licencias de Actividad',
                description: 'Tramitación de licencias y permisos de apertura',
              },
              {
                icon: Globe,
                title: 'Dirección de Obra',
                description: 'Supervisión profesional y control de calidad',
              },
              {
                icon: FileCheck,
                title: 'Estudios Técnicos',
                description: 'Informes periciales y estudios especializados',
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Todos los Servicios <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                ¿Por Qué Elegirnos?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Compromiso con la excelencia en cada proyecto
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Experiencia Internacional',
                description: 'Más de 15 años desarrollando proyectos a nivel nacional e internacional con los más altos estándares de calidad',
              },
              {
                title: 'Equipo Multidisciplinar',
                description: 'Profesionales especializados en arquitectura, ingeniería y gestión de proyectos trabajando en perfecta coordinación',
              },
              {
                title: 'Innovación y Tecnología',
                description: 'Utilizamos las últimas tecnologías BIM y software especializado para optimizar cada proyecto',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-gray-800 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Iniciar su Proyecto?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contáctenos hoy y descubra cómo podemos ayudarle a hacer realidad sus ideas
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Solicitar Presupuesto <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
