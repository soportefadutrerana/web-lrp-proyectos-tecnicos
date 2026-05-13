import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { teamMemberService } from '@/lib/team-member.service'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

type Params = {
  id: string
}

export const dynamic = 'force-dynamic'

export default async function AdminTeamDetailPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const id = Number(params.id)

  if (!Number.isInteger(id) || id <= 0) {
    notFound()
  }

  const member = await teamMemberService.getById(id)

  if (!member) {
    notFound()
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/45 mb-2">Show</p>
            <h1 className="font-serif text-4xl text-charcoal">{member.nombre}</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/equipo">Volver al listado del equipo</Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <p className="text-sm text-charcoal/70"><strong>Puesto:</strong> {member.puesto}</p>
            <p className="text-sm text-charcoal/70"><strong>Orden:</strong> {member.orden}</p>
            <p className="text-sm text-charcoal/70"><strong>Slug:</strong> {member.slug}</p>
            <div>
              <Badge variant={member.activo ? 'default' : 'outline'}>
                {member.activo ? 'Activo' : 'Oculto'}
              </Badge>
            </div>
          </div>

          {member.fotoUrl ? (
            <div className="mb-5">
              <p className="text-sm font-medium text-charcoal mb-2">Foto</p>
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image src={member.fotoUrl} alt={member.nombre} fill className="object-cover object-top" />
              </div>
            </div>
          ) : null}

          <div className="mb-5">
            <p className="text-sm font-medium text-charcoal mb-2">Biografía</p>
            <p className="text-charcoal/75 leading-relaxed">{member.bio}</p>
          </div>

          {member.especialidades.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-charcoal mb-2">Especialidades</p>
              <div className="flex flex-wrap gap-2">
                {member.especialidades.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
