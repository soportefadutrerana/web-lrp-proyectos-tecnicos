import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import AdminLoginForm from './login-form'

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/admin')
  }

  return <AdminLoginForm />
}
