import AnimatedSection from '@/components/animated-section'
import { ArrowRight, Building2, HardHat } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Equipo Técnico | LRP Proyectos Técnicos',
  description: 'Conoce el equipo técnico de LRP Proyectos Técnicos.',
}

export default function EquipoTecnicoPage() {
  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?fm=jpg&q=80&w=3000"
            alt="Equipo técnico"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-charcoal/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20 w-full">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.98] mb-6">
                Equipo Técnico
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
                Conoce a la profesional que lidera actualmente nuestro equipo técnico.
              </p>
              <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                Contactar con el equipo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestro Equipo</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-12 leading-tight">
              Profesionales que hacen posible cada proyecto
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <article className="rounded-3xl border border-charcoal/10 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
                <div className="relative w-full max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border border-charcoal/10 bg-charcoal/5">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019707-1c04de26e58c?fm=jpg&q=80&w=1200"
                    alt="Annia, arquitecta"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-serif text-3xl text-charcoal">Annia</h3>
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-charcoal">
                      <Building2 className="w-3.5 h-3.5" />
                      Arquitecta
                    </span>
                  </div>

                  <p className="text-charcoal/65 leading-relaxed mb-6">
                    Annia forma actualmente el equipo técnico de LRP Proyectos Técnicos. Se encarga del desarrollo y coordinación de proyectos de arquitectura, aportando una visión precisa y orientada a la calidad en cada fase del trabajo.
                  </p>

                  <ul className="space-y-3 text-charcoal/70">
                    <li className="flex items-start gap-3">
                      <HardHat className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                      <span>Desarrollo de proyectos de arquitectura.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <HardHat className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                      <span>Coordinación técnica y seguimiento documental.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <HardHat className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                      <span>Soporte en tramitaciones y gestión de licencias.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
