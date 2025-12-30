import Image from 'next/image'
import AnimatedSection from '@/components/animated-section'
import { MapPin, Calendar, Building } from 'lucide-react'

export const metadata = {
  title: 'Portfolio | LRP Proyectos Técnicos',
  description: 'Descubre nuestros proyectos destacados de arquitectura e ingeniería a nivel nacional e internacional.',
}

const projects = [
  {
    title: 'Complejo Residencial Moderno',
    location: 'Madrid, España',
    year: '2023',
    category: 'Residencial',
    description: 'Diseño y ejecución de complejo residencial de 120 viviendas con certificación energética A. Incluye zonas comunes, piscina y áreas verdes.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg',
  },
  {
    title: 'Edificio Corporativo Internacional',
    location: 'Barcelona, España',
    year: '2022',
    category: 'Comercial',
    description: 'Proyecto integral de oficinas de 8.000 m² con tecnología BIM, instalaciones inteligentes y espacios sostenibles.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Nave Industrial Logística',
    location: 'Zaragoza, España',
    year: '2023',
    category: 'Industrial',
    description: 'Nave industrial de 5.000 m² con sistemas automatizados, instalación fotovoltaica y certificación LEED.',
    image: 'https://images.pexels.com/photos/3769292/pexels-photo-3769292.jpeg?cs=srgb&dl=pexels-timo-volz-837240-3769292.jpg&fm=jpg',
  },
  {
    title: 'Rehabilitación Edificio Histórico',
    location: 'Sevilla, España',
    year: '2022',
    category: 'Rehabilitación',
    description: 'Rehabilitación integral manteniendo fachada histórica, adaptación a normativa actual y mejora de eficiencia energética.',
    image: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Centro Comercial Sostenible',
    location: 'Valencia, España',
    year: '2021',
    category: 'Comercial',
    description: 'Centro comercial de 12.000 m² con enfoque en sostenibilidad, iluminación LED y sistemas de climatización eficientes.',
    image: 'https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg?cs=srgb&dl=pexels-ivan-s-4491829.jpg&fm=jpg',
  },
  {
    title: 'Infraestructura Vial Urbana',
    location: 'Bilbao, España',
    year: '2022',
    category: 'Ingeniería Civil',
    description: 'Proyecto de mejora de infraestructuras urbanas: viales, aceras, iluminación y sistemas de drenaje sostenible.',
    image: 'https://plus.unsplash.com/premium_photo-1664474927853-900d5ee1fd80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l2aWwlMjBlbmdpbmVlcmluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
]

export default function Portfolio() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Nuestro Portfolio</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Proyectos que transforman espacios y mejoran vidas
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map?.((project, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={project?.image ?? ''}
                      alt={project?.title ?? ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                      {project?.category ?? ''}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project?.title ?? ''}</h3>
                    <p className="text-gray-600 mb-6">{project?.description ?? ''}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{project?.location ?? ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{project?.year ?? ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )) ?? null}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <AnimatedSection>
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="text-blue-100">Proyectos Completados</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div>
                <div className="text-5xl font-bold mb-2">25+</div>
                <p className="text-blue-100">Países</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <div className="text-5xl font-bold mb-2">1M+</div>
                <p className="text-blue-100">m² Construidos</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div>
                <div className="text-5xl font-bold mb-2">98%</div>
                <p className="text-blue-100">Clientes Satisfechos</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
