import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-160px)] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl text-charcoal mb-4">Panel de Administrador</h1>
        <p className="text-charcoal/70 mb-8">
          Sesion iniciada como {session.user?.email}. Desde aqui podras gestionar proyectos del portfolio.
        </p>

        <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
          <p className="text-charcoal/70 mb-4">
            Base lista. En el siguiente paso conectamos operaciones CRUD para crear, editar y eliminar proyectos.
          </p>
          <Link href="/portfolio" className="btn-outline-gold inline-flex items-center gap-2 text-sm">
            Ver Portfolio Publico
          </Link>
        </div>
      </div>
    </section>
  )
}
