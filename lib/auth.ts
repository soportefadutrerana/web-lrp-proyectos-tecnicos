import { prisma } from '@/lib/db'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim()?.toLowerCase()
        const password = credentials?.password ?? ''

        if (!email || !password) {
          return null
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email },
        })

        if (!admin || !admin.activo) {
          return null
        }

        const passwordIsValid = await compare(password, admin.passwordHash)

        if (!passwordIsValid) {
          return null
        }

        return {
          id: String(admin.id),
          name: admin.nombre,
          email: admin.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.name = session.user.name ?? 'Administrador'
        session.user.email = session.user.email ?? ''
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
