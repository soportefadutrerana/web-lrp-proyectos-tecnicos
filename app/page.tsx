import AnimatedCounter from '@/components/animated-counter'
import AnimatedSection from '@/components/animated-section'
import { ArrowRight, ArrowUpRight, Award, Building2, ChevronDown, FileCheck, Globe, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-start overflow-hidden pt-20 sm:pt-24">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=80&w=3000"
            alt="Arquitectura moderna"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          {/* Layered overlays for cleaner text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-charcoal/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(201,168,76,0.18),transparent_42%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-8 sm:pt-10 pb-14 sm:pb-16">
          <AnimatedSection>
            <div className="max-w-4xl">
              
              {/* Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.98] mb-7 max-w-4xl text-balance">
                Transformamos
                <br />
                <em className="not-italic text-gold">Ideas</em> en
                <br />
                Realidades
              </h1>

              {/* Subtext */}
              <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-10 sm:mb-12 font-light leading-relaxed">
                Especialistas en arquitectura, proyectos tecnicos e ingenieria, con una ejecucion precisa y presencia nacional e internacional.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-10">
                <Link href="/servicios" className="btn-gold inline-flex items-center justify-center gap-2 min-w-[220px]">
                  Nuestros Servicios
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contacto" className="btn-outline-white inline-flex items-center justify-center gap-2 min-w-[220px]">
                  Iniciar Proyecto
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/35">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-charcoal-800 py-16 sm:py-18">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { end: 15, suffix: '+', label: 'Años de Experiencia' },
              { end: 500, suffix: '+', label: 'Proyectos Completados' },
              { end: 98, suffix: '%', label: 'Clientes Satisfechos' },
              { end: 25, suffix: '+', label: 'Países' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center px-6 sm:px-8 py-8 sm:py-10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
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

      {/* ── INTRO STRIP ── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-label">Quiénes Somos</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
                Más de 15 años construyendo el futuro
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-charcoal/60 text-lg leading-relaxed mb-6">
                LRP Proyectos Técnicos nació con la visión de ofrecer servicios integrales de arquitectura e ingeniería con los más altos estándares de calidad. Hoy somos referentes en el sector, con proyectos en más de 25 países.
              </p>
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest group"
                style={{ letterSpacing: '0.15em' }}
              >
                Conocer nuestra historia
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="section-label">Lo Que Hacemos</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                  Nuestros Servicios
                </h2>
              </div>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest group self-start md:self-auto"
                style={{ letterSpacing: '0.15em' }}
              >
                Ver todos
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
            {[
              {
                icon: Building2,
                number: '01',
                title: 'Proyectos de Arquitectura',
                description: 'Diseño integral de edificaciones residenciales, comerciales e industriales con los más altos estándares.',
              },
              {
                icon: Ruler,
                number: '02',
                title: 'Ingeniería Civil',
                description: 'Estructuras, cimentaciones y cálculos técnicos especializados con software de última generación.',
              },
              {
                icon: FileCheck,
                number: '03',
                title: 'Certificación Energética',
                description: 'Certificados de eficiencia energética, auditorías y planes de mejora para edificios.',
              },
              {
                icon: Award,
                number: '04',
                title: 'Licencias de Actividad',
                description: 'Tramitación integral de licencias municipales y permisos de apertura.',
              },
              {
                icon: Globe,
                number: '05',
                title: 'Dirección de Obra',
                description: 'Supervisión profesional, control de calidad y gestión técnica del proceso constructivo.',
              },
              {
                icon: FileCheck,
                number: '06',
                title: 'Estudios Técnicos',
                description: 'Informes periciales, ITE y estudios de viabilidad especializados.',
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.07}>
                <div className="bg-white p-10 group hover:bg-charcoal transition-all duration-500 cursor-default h-full">
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-serif text-gold/30 text-5xl font-bold group-hover:text-gold/50 transition-colors duration-500 leading-none">
                      {service.number}
                    </span>
                    <service.icon className="w-7 h-7 text-gold/60 group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-white mb-4 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/50 group-hover:text-white/50 text-sm leading-relaxed transition-colors duration-500">
                    {service.description}
                  </p>
                  <div className="mt-8 w-8 h-px bg-gold/30 group-hover:w-full group-hover:bg-gold/60 transition-all duration-700" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000"
            alt="Edificio corporativo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/92" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Por Qué Elegirnos</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-16 max-w-xl leading-tight">
              Compromiso con la excelencia en cada proyecto
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-0 divide-x divide-white/10">
            {[
              {
                number: '01',
                title: 'Experiencia Internacional',
                description: 'Más de 15 años desarrollando proyectos a nivel nacional e internacional con los más altos estándares de calidad.',
              },
              {
                number: '02',
                title: 'Equipo Multidisciplinar',
                description: 'Arquitectos, ingenieros y gestores especializados trabajando en perfecta coordinación para cada proyecto.',
              },
              {
                number: '03',
                title: 'Innovación y Tecnología',
                description: 'Utilizamos las últimas tecnologías BIM y software especializado para optimizar cada fase del proyecto.',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <div className="px-10 py-4 first:pl-0 last:pr-0">
                  <span className="font-serif text-gold/20 text-6xl font-bold leading-none block mb-6">
                    {item.number}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/45 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="bg-cream py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="section-label">Nuestro Trabajo</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                  Proyectos Destacados
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest group self-start md:self-auto"
                style={{ letterSpacing: '0.15em' }}
              >
                Ver portfolio completo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Complejo Residencial Moderno',
                category: 'Residencial',
                location: 'Madrid, 2023',
                image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg',
              },
              {
                title: 'Edificio Corporativo Internacional',
                category: 'Comercial',
                location: 'Barcelona, 2022',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000',
              },
            ].map((project, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <Link href="/portfolio" className="group block relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-gold text-xs uppercase font-semibold tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-white/50 text-sm">{project.location}</p>
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-charcoal py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <div className="w-16 h-px bg-gold mx-auto mb-10" />
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                ¿Listo para iniciar<br />su proyecto?
              </h2>
              <p className="text-white/50 text-lg mb-12 leading-relaxed">
                Contáctenos hoy y descubra cómo podemos hacer realidad sus ideas con la más alta calidad técnica.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                  Solicitar Presupuesto
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/servicios" className="btn-outline-white">
                  Ver Servicios
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
