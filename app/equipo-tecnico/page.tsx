import AnimatedSection from '@/components/animated-section'
import { authOptions } from '@/lib/auth'
import { teamMemberService } from '@/lib/team-member.service'
import { ArrowRight, HardHat } from 'lucide-react'
import { getServerSession } from 'next-auth'
import type { TeamMember } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Equipo Técnico | LRP Proyectos Técnicos',
  description: 'Conoce el equipo técnico de LRP Proyectos Técnicos.',
}

export default async function EquipoTecnicoPage() {
  const session = await getServerSession(authOptions)
  const teamMembers = await teamMemberService.listPublic()

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
                Nuestro equipo profesional acompaña cada proyecto con criterio técnico y visión práctica.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
                  Contactar con el equipo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {session?.user ? (
                  <Link href="/admin/equipo" className="btn-outline-gold inline-flex items-center gap-2 text-sm">
                    Gestionar equipo
                  </Link>
                ) : null}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection>
            <p className="section-label">Nuestro Equipo</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-12 leading-tight">
              Profesionales que hacen posible cada proyecto
            </h2>
          </AnimatedSection>

          {teamMembers.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <article className="rounded-3xl border border-charcoal/10 bg-white p-8 shadow-sm">
                <p className="text-charcoal/70">Todavía no hay miembros publicados en el equipo técnico.</p>
              </article>
            </AnimatedSection>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {teamMembers.map((member: TeamMember, index: number) => (
                <AnimatedSection key={member.id} delay={index * 0.08}>
                  <article className="rounded-3xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm h-full">
                    <div className="grid sm:grid-cols-[160px_1fr] gap-6 items-start">
                      <div className="relative w-full max-w-[180px] aspect-[3/4] rounded-2xl overflow-hidden border border-charcoal/10 bg-charcoal/5">
                        <Image src={member.fotoUrl} alt={member.nombre} fill className="object-cover" />
                      </div>

                      <div>
                        <h3 className="font-serif text-3xl text-charcoal mb-1">{member.nombre}</h3>
                        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-charcoal mb-4">
                          {member.puesto}
                        </span>

                        <p className="text-charcoal/65 leading-relaxed mb-5">{member.bio}</p>

                        {(member.especialidades ?? []).length > 0 ? (
                          <ul className="space-y-2 text-charcoal/70">
                            {member.especialidades.map((item: string) => (
                              <li key={item} className="flex items-start gap-3">
                                <HardHat className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
