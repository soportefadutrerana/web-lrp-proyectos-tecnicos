import AnimatedSection from '@/components/animated-section'
import { ArrowRight, Award, CheckCircle, Eye, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Sobre Nosotros | LRP Proyectos Técnicos',
  description: 'Conoce nuestra historia, misión, visión y valores. Más de 15 años de experiencia en arquitectura e ingeniería.',
}

export default function SobreNosotros() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/6614837/pexels-photo-6614837.jpeg"
            alt="Equipo LRP"
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
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-10 bg-gold" />
                <span className="text-gold text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                  Nuestra Historia · Misión · Valores
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.02] mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>
                Sobre Nosotros
              </h1>
              <div className="w-16 h-0.5 bg-gold/70 mb-7" />
              <p className="text-white text-base sm:text-lg max-w-xl font-light leading-relaxed mb-10" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>
                Desde 2008 desarrollamos proyectos de arquitectura e ingeniería con metodología rigurosa, enfoque innovador y visión internacional.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2.5">
                Hablemos de su proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg"
                  alt="Nuestra historia"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Year badge */}
                <div className="absolute bottom-0 right-0 bg-gold px-8 py-6">
                  <p className="font-serif text-charcoal text-4xl font-bold leading-none">2008</p>
                  <p className="text-charcoal/60 text-xs uppercase tracking-widest mt-1" style={{ letterSpacing: '0.15em' }}>Fundación</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="section-label">Nuestra Historia</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                Construyendo excelencia desde 2008
              </h2>
              <div className="space-y-4 text-charcoal/60 leading-relaxed">
                <p>
                  LRP Proyectos Técnicos nace en 2008 con la visión de ofrecer servicios integrales de arquitectura e ingeniería con los más altos estándares de calidad.
                </p>
                <p>
                  A lo largo de más de 15 años, hemos desarrollado proyectos a nivel nacional e internacional, consolidándonos como referente en el sector de la arquitectura técnica y la ingeniería civil.
                </p>
                <p>
                  Nuestro compromiso con la innovación, la sostenibilidad y la excelencia técnica nos ha permitido crecer continuamente y adaptarnos a las necesidades cambiantes del mercado.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestros Fundamentos</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-12 max-w-xl leading-tight">
              Principios que guían nuestro trabajo
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                number: '01',
                title: 'Misión',
                description: 'Proporcionar soluciones técnicas innovadoras y de calidad en arquitectura e ingeniería, garantizando la satisfacción de nuestros clientes mediante un servicio profesional, personalizado y comprometido con la excelencia.',
              },
              {
                icon: Eye,
                number: '02',
                title: 'Visión',
                description: 'Ser reconocidos como líderes en el sector de proyectos técnicos y arquitectura a nivel internacional, destacando por nuestra capacidad de innovación, sostenibilidad y compromiso con el desarrollo de proyectos que mejoran la calidad de vida.',
              },
              {
                icon: Award,
                number: '03',
                title: 'Valores',
                description: '',
                values: [
                  'Excelencia técnica y profesional',
                  'Compromiso con la innovación',
                  'Sostenibilidad ambiental',
                  'Integridad y transparencia',
                  'Orientación al cliente',
                ],
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.12}>
                <div className="h-full rounded-2xl border border-charcoal/10 bg-white p-10 group hover:border-gold/30 hover:bg-charcoal transition-all duration-500">
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-serif text-[#b39a70] text-6xl font-bold leading-none tracking-tight group-hover:text-[#c8b088] transition-colors duration-500">
                      {item.number}
                    </span>
                    <item.icon className="w-6 h-6 text-[#b39a70] group-hover:text-[#c8b088] transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-white mb-5 transition-colors duration-500">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-charcoal/60 group-hover:text-white/75 leading-relaxed text-sm transition-colors duration-500">
                      {item.description}
                    </p>
                  )}
                  {item.values && (
                    <ul className="space-y-3 mt-4">
                      {item.values.map((value, vi) => (
                        <li key={vi} className="flex items-center gap-3 text-charcoal/60 group-hover:text-white/75 transition-colors duration-500">
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                          <span className="text-sm">{value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNATIONAL EXPERIENCE ── */}
      <section className="relative py-24 overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 z-0 opacity-100">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000"
            alt="Experiencia internacional"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/30 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-10 bg-gold" />
                <span className="text-gold text-[10px] font-semibold uppercase tracking-[0.3em]">
                  Presencia Global
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                Experiencia Internacional
              </h2>

              <div className="w-12 h-0.5 bg-gold mb-8" />

              <p className="text-white/75 text-lg font-light leading-relaxed mb-12 max-w-xl">
                Nuestra trayectoria nos ha llevado a desarrollar proyectos en diversos países, colaborando con clientes de distintos sectores y adaptándonos a normativas y contextos culturales variados.
              </p>

            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestros Profesionales</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-12 leading-tight">
              Nuestro Equipo
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-px bg-charcoal/10">
            {[
              {
                title: 'Arquitectos Colegiados',
                description: 'Especialistas en diseño arquitectónico, urbanismo y rehabilitación de edificios con amplia experiencia nacional e internacional.',
                icon: '01',
              },
              {
                title: 'Ingenieros Técnicos',
                description: 'Expertos en cálculo de estructuras, instalaciones industriales y elaboración de proyectos técnicos para todo tipo de edificaciones.',
                icon: '02',
              },
              {
                title: 'Gestores de Proyecto',
                description: 'Profesionales en planificación estratégica, coordinación de equipos y control integral de obras desde el inicio hasta la entrega.',
                icon: '03',
              },
            ].map((role, index) => (
              <AnimatedSection key={index} delay={index * 0.12}>
                <div className="bg-cream p-10 h-full group hover:bg-charcoal transition-all duration-500">
                  <span className="font-serif text-[#b39a70] text-5xl font-bold leading-none block mb-6 group-hover:text-[#c8b088] transition-colors duration-500">
                    {role.icon}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-white mb-4 transition-colors duration-500">
                    {role.title}
                  </h3>
                  <p className="text-charcoal/55 group-hover:text-white/45 text-sm leading-relaxed transition-colors duration-500">
                    {role.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Trabajemos juntos
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
              Cuéntenos su proyecto y le mostraremos cómo podemos ayudarle.
            </p>
            <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
              Contactar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
