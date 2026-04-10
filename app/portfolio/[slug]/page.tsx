import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = await portfolioProjectService.getPublicBySlug(slug)

  if (!project) {
    return {
      title: 'Proyecto no encontrado | LRP Proyectos Técnicos',
    }
  }

  return {
    title: `${project.titulo} | LRP Proyectos Técnicos`,
    description: project.descripcion,
  }
}

export default async function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = await portfolioProjectService.getPublicBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <section className="bg-cream pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
              <Image
                src={project.imagenPrincipal}
                alt={project.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {(project.imagenes ?? []).slice(0, 4).map((imageUrl, index) => (
                <div key={`${imageUrl}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
                  <Image src={imageUrl} alt={`${project.titulo} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm sticky top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/45 mb-3">Detalle de proyecto</p>
            <h1 className="font-serif text-4xl text-charcoal mb-4">{project.titulo}</h1>
            <p className="text-charcoal/70 leading-relaxed mb-6">{project.descripcion}</p>

            <div className="space-y-3 text-sm text-charcoal/75 mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>{project.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" />
                <span>{project.anio}</span>
              </div>
              <div>
                <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.15em] text-charcoal">
                  {project.categoria}
                </span>
              </div>
            </div>

            <Link href="/contacto" className="btn-gold inline-flex items-center gap-2">
              Solicitar proyecto similar
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
