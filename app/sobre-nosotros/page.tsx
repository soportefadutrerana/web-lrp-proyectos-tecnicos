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
            src="https://plus.unsplash.com/premium_photo-1661418218904-86c202e5493d?fm=jpg&q=80&w=3000"
            alt="Equipo LRP"
            fill
            className="object-cover scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/72 to-charcoal/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-charcoal/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(201,168,76,0.14),transparent_42%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.98] mb-6">
              Sobre Nosotros
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
                Desde 2008 desarrollamos proyectos de arquitectura e ingenieria con una metodologia rigurosa, enfoque innovador y vision internacional.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                Hablemos de su proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="bg-white py-28">
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
      <section className="bg-cream py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestros Fundamentos</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-16 max-w-xl leading-tight">
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
                    <span className="font-serif text-gold/25 text-5xl font-bold leading-none group-hover:text-gold/40 transition-colors duration-500">
                      {item.number}
                    </span>
                    <item.icon className="w-6 h-6 text-gold/50 group-hover:text-gold transition-colors duration-500" />
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
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=3000"
            alt="Experiencia internacional"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/94" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/88 to-charcoal/96" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(201,168,76,0.12),transparent_38%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Experiencia Internacional 
              </h2>
              <p className="text-white text-lg mb-10 leading-relaxed max-w-xl">
                Nuestra trayectoria nos ha llevado a desarrollar proyectos en más de 25 países, trabajando con clientes de diversos sectores y adaptándonos a normativas y contextos culturales variados.
              </p>
              <ul className="space-y-5">
                {[
                  'Proyectos en Europa, América Latina, África y Medio Oriente',
                  'Experiencia en normativas internacionales y locales',
                  'Equipo multidisciplinar con visión global',
                  'Colaboración con socios estratégicos internacionales',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/60">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: '25+', label: 'Países' },
                  { number: '15+', label: 'Años' },
                  { number: '500+', label: 'Proyectos' },
                  { number: '98%', label: 'Satisfacción' },
                ].map((stat, i) => (
                  <div key={i} className="min-h-44 rounded-2xl bg-charcoal-800 border border-white/12 p-8 text-center flex flex-col items-center justify-center hover:border-gold/50 transition-colors duration-300">
                    <p className="font-serif text-4xl font-bold text-gold mb-3">{stat.number}</p>
                    <p className="text-white text-[11px] uppercase tracking-[0.16em]" style={{ letterSpacing: '0.15em' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestros Profesionales</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-16 leading-tight">
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
                  <span className="font-serif text-gold/25 text-5xl font-bold leading-none block mb-6 group-hover:text-gold/40 transition-colors duration-500">
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
      <section className="bg-charcoal py-24">
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
