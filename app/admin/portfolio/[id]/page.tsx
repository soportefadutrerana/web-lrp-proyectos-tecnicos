import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { portfolioProjectService } from '@/lib/portfolio-project.service'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

type Params = {
  id: string
}

export const dynamic = 'force-dynamic'

export default async function AdminPortfolioDetailPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const id = Number(params.id)

  if (!Number.isInteger(id) || id <= 0) {
    notFound()
  }

  const project = await portfolioProjectService.getAdminById(id)

  if (!project) {
    notFound()
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/45 mb-2">Show</p>
            <h1 className="font-serif text-4xl text-charcoal">{project.titulo}</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/portfolio">Volver al listado de proyectos</Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <p className="text-sm text-charcoal/70"><strong>Categoría:</strong> {project.categoria}</p>
            <p className="text-sm text-charcoal/70"><strong>Ubicación:</strong> {project.ubicacion}</p>
            <p className="text-sm text-charcoal/70"><strong>Año:</strong> {project.anio}</p>
            <p className="text-sm text-charcoal/70"><strong>Orden:</strong> {project.orden}</p>
            <p className="text-sm text-charcoal/70"><strong>Slug:</strong> {project.slug}</p>
            <div className="flex gap-2">
              <Badge variant={project.publicado ? 'default' : 'outline'}>
                {project.publicado ? 'Publicado' : 'Oculto'}
              </Badge>
              {project.destacado ? <Badge variant="outline">Destacado</Badge> : null}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-charcoal mb-2">Descripción</p>
            <p className="text-charcoal/75 leading-relaxed">{project.descripcion}</p>
          </div>

          {project.imagenPrincipal ? (
            <div className="mb-5">
              <p className="text-sm font-medium text-charcoal mb-2">Imagen principal</p>
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <Image src={project.imagenPrincipal} alt={project.titulo} fill className="object-cover" />
              </div>
            </div>
          ) : null}

          {project.imagenes.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-charcoal mb-3">Galería</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.imagenes.map((url) => (
                  <div key={url} className="relative h-28 w-full overflow-hidden rounded-md">
                    <Image src={url} alt={project.titulo} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
