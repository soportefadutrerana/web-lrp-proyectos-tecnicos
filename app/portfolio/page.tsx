import AnimatedCounter from '@/components/animated-counter'
import AnimatedSection from '@/components/animated-section'
import { authOptions } from '@/lib/auth'
import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Portfolio | LRP Proyectos Técnicos',
  description: 'Descubre nuestros proyectos destacados de arquitectura e ingeniería a nivel nacional e internacional.',
}

export default async function Portfolio() {
  const session = await getServerSession(authOptions)
  const projects = await portfolioProjectService.listPublic()

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={projects?.[0]?.imagenPrincipal ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000'}
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
              <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9 text-white/90">
                Una selección de proyectos reales que reflejan nuestra forma de trabajar: precisión técnica, diseño funcional y ejecución con estándares exigentes.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                Iniciar proyecto
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-charcoal/60 text-xl leading-relaxed">
              Cada proyecto refleja nuestro compromiso con la excelencia técnica, la innovación y la satisfacción de nuestros clientes. Proyectos que transforman espacios y mejoran vidas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-4 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {session?.user ? (
            <div className="mb-6 flex justify-end">
              <Link href="/admin?new=1" className="btn-gold inline-flex items-center gap-2 text-sm">
                Crear nuevo proyecto
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : null}

          <div className="grid md:grid-cols-2 gap-4">
            {projects?.map?.((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.08}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative block overflow-hidden aspect-[4/3] cursor-pointer rounded-2xl border border-charcoal/10"
                >
                  <Image
                    src={project.imagenPrincipal}
                    alt={project.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/96 via-charcoal/70 to-charcoal/15 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-6 left-6">
                    <span className="bg-gold text-charcoal text-xs font-semibold uppercase px-3 py-1.5 tracking-widest" style={{ letterSpacing: '0.15em' }}>
                      {project.categoria}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6 max-w-[60%] rounded-md bg-white px-3 py-1.5">
                    <p className="text-charcoal text-[11px] font-semibold uppercase tracking-[0.08em] truncate">
                      {project.titulo}
                    </p>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-charcoal-900/95 px-3 py-1.5 text-white">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        {project.ubicacion}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-charcoal-900/95 px-3 py-1.5 text-white">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {project.anio}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            )) ?? null}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-800 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { end: 500, suffix: '+', label: 'Proyectos Completados' },
              { end: 25, suffix: '+', label: 'Países' },
              { end: 1, suffix: 'M+ m²', label: 'Construidos' },
              { end: 98, suffix: '%', label: 'Clientes Satisfechos' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-charcoal/95 text-center px-6 sm:px-8 py-8 sm:py-10">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/60 text-[11px] sm:text-xs uppercase tracking-[0.16em]" style={{ letterSpacing: '0.15em' }}>
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
