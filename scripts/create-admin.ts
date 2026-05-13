import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

async function main() {
  const email = process.argv[2]?.trim()?.toLowerCase()
  const password = process.argv[3]
  const nombre = process.argv[4] ?? 'Administrador'

  if (!email || !password) {
    console.error('Uso: npm run admin:create -- <email> <password> [nombre]')
    process.exit(1)
  }

  const passwordHash = await hash(password, 12)

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      nombre,
      passwordHash,
      activo: true,
    },
    create: {
      nombre,
      email,
      passwordHash,
      activo: true,
    },
  })

  console.log(`Administrador listo: ${admin.email}`)
}

main()
  .catch((error) => {
    console.error('No se pudo crear el administrador:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
