import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'LRP Proyectos Técnicos | Arquitectura, Proyectos e Ingeniería',
  description: 'Empresa especializada en arquitectura, proyectos técnicos e ingeniería civil a nivel nacional e internacional. Servicios profesionales de certificación energética, dirección de obra, licencias y estudios técnicos.',
  keywords: ['arquitectura', 'ingeniería', 'proyectos técnicos', 'certificación energética', 'dirección de obra', 'licencias de actividad'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'LRP Proyectos Técnicos | Arquitectura, Proyectos e Ingeniería',
    description: 'Empresa especializada en arquitectura, proyectos técnicos e ingeniería civil a nivel nacional e internacional.',
    images: ['/og-image.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
