import AnimatedCounter from '@/components/animated-counter'
import AnimatedSection from '@/components/animated-section'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    size: 'large',
  },
  {
    title: 'Edificio Corporativo Internacional',
    location: 'Barcelona, España',
    year: '2022',
    category: 'Comercial',
    description: 'Proyecto integral de oficinas de 8.000 m² con tecnología BIM, instalaciones inteligentes y espacios sostenibles.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000',
    size: 'small',
  },
  {
    title: 'Nave Industrial Logística',
    location: 'Zaragoza, España',
    year: '2023',
    category: 'Industrial',
    description: 'Nave industrial de 5.000 m² con sistemas automatizados, instalación fotovoltaica y certificación LEED.',
    image: 'https://images.pexels.com/photos/3769292/pexels-photo-3769292.jpeg?cs=srgb&dl=pexels-timo-volz-837240-3769292.jpg&fm=jpg',
    size: 'small',
  },
  {
    title: 'Rehabilitación Edificio Histórico',
    location: 'Sevilla, España',
    year: '2022',
    category: 'Rehabilitación',
    description: 'Rehabilitación integral manteniendo fachada histórica, adaptación a normativa actual y mejora de eficiencia energética.',
    image: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000',
    size: 'large',
  },
  {
    title: 'Centro Comercial Sostenible',
    location: 'Valencia, España',
    year: '2021',
    category: 'Comercial',
    description: 'Centro comercial de 12.000 m² con enfoque en sostenibilidad, iluminación LED y sistemas de climatización eficientes.',
    image: 'https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg?cs=srgb&dl=pexels-ivan-s-4491829.jpg&fm=jpg',
    size: 'small',
  },
  {
    title: 'Infraestructura Vial Urbana',
    location: 'Bilbao, España',
    year: '2022',
    category: 'Ingeniería Civil',
    description: 'Proyecto de mejora de infraestructuras urbanas: viales, aceras, iluminación y sistemas de drenaje sostenible.',
    image: 'https://plus.unsplash.com/premium_photo-1664474927853-900d5ee1fd80?fm=jpg&q=60&w=3000',
    size: 'small',
  },
]

export default function Portfolio() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000"
            alt="Portfolio LRP"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/88 via-charcoal/42 to-charcoal/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(201,168,76,0.14),transparent_42%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.98] mb-6">
                Portfolio
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9" style={{ color: '#FFFFFF' }}>
                Una seleccion de proyectos que reflejan nuestra forma de trabajar: precision tecnica, diseno funcional y ejecucion con estandares exigentes.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                Iniciar proyecto
                <ArrowUpRight className="w-4 h-4" />
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
              Cada proyecto refleja nuestro compromiso con la excelencia técnica, la innovación y la satisfacción de nuestros clientes. Proyectos que transforman espacios y mejoran vidas.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="bg-white py-4 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-4">
            {projects?.map?.((project, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <div className="group relative overflow-hidden aspect-[4/3] cursor-pointer">
                  <Image
                    src={project?.image ?? ''}
                    alt={project?.title ?? ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-gold text-charcoal text-xs font-semibold uppercase px-3 py-1.5 tracking-widest" style={{ letterSpacing: '0.15em' }}>
                      {project?.category ?? ''}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-gold group-hover:text-gold">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">
                      {project?.title ?? ''}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project?.description ?? ''}
                    </p>
                    <div className="flex items-center gap-6 text-xs text-white/40">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {project?.location ?? ''}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {project?.year ?? ''}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )) ?? null}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-charcoal-800 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { end: 500, suffix: '+', label: 'Proyectos Completados' },
              { end: 25, suffix: '+', label: 'Países' },
              { end: 1, suffix: 'M+ m²', label: 'Construidos' },
              { end: 98, suffix: '%', label: 'Clientes Satisfechos' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center px-8 py-4">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-1">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-2" style={{ letterSpacing: '0.15em' }}>
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-charcoal py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Su proyecto podría ser el siguiente?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Hablemos de su visión y hagámosla realidad.
            </p>
            <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
              Iniciar Proyecto
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
