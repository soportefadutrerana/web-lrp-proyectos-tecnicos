# LRP Proyectos Tecnicos

Aplicacion web corporativa desarrollada con Next.js para presentar los servicios, el portfolio y el equipo de LRP Proyectos Tecnicos. El proyecto incluye un panel de administracion privado para gestionar el contenido principal del sitio sin tocar codigo.

## Funcionalidades principales

- Pagina de inicio con hero, estadisticas, resumen de servicios y proyectos destacados.
- Paginas publicas de `Servicios`, `Sobre nosotros`, `Equipo tecnico`, `Portfolio` y `Contacto`.
- Portfolio dinamico con proyectos publicados, detalle por `slug`, orden manual y proyectos destacados.
- Gestion del equipo tecnico con perfiles, foto, biografia, especialidades, orden y visibilidad publica.
- Formulario de contacto que guarda los mensajes en PostgreSQL.
- Panel de administracion protegido con NextAuth y login por credenciales.
- Subida de imagenes al directorio `public/uploads/portfolio`.
- Edicion de los datos publicos de contacto desde el panel de administracion.

## Stack tecnico

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth

## Requisitos previos

- Node.js 20 LTS recomendado
- npm
- Docker Desktop

Si no quieres usar Docker, tambien puedes apuntar `DATABASE_URL` a una instancia de PostgreSQL ya existente.

## Instalacion del entorno local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el archivo de entorno

Usa el ejemplo incluido en el repo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

El `docker-compose.yml` del proyecto crea una base de datos PostgreSQL 15 accesible en `localhost:5432`.

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Crear la estructura de base de datos

```bash
npx prisma db push
```

Este proyecto no usa migraciones versionadas por ahora, asi que el flujo local actual es `prisma db push`.

### 6. Crear el usuario administrador

```bash
npm run admin:create -- admin@empresa.com password123 "Administrador"
```

Con ese usuario ya podras iniciar sesion en `/admin/login`.

### 7. Arrancar el proyecto en desarrollo

```bash
npm run dev
```

La aplicacion quedara disponible en:

- `http://localhost:3000`
- Panel admin: `http://localhost:3000/admin`

## Variables de entorno

Las variables necesarias para arrancar el proyecto son:

| Variable | Obligatoria | Descripcion |
| --- | --- | --- |
| `DATABASE_URL` | Si | Conexion a PostgreSQL usada por Prisma. |
| `NEXTAUTH_SECRET` | Si | Clave secreta para firmar la sesion de NextAuth. |
| `NEXTAUTH_URL` | Si | URL base de la aplicacion, normalmente `http://localhost:3000` en local. |

Variables opcionales de build:

| Variable | Obligatoria | Descripcion |
| --- | --- | --- |
| `NEXT_DIST_DIR` | No | Permite cambiar la carpeta de salida de Next.js. |
| `NEXT_OUTPUT_MODE` | No | Permite usar modos de salida como `standalone`. |

## Scripts utiles

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run admin:create -- <email> <password> [nombre]
```

## Persistencia y contenido

El proyecto mezcla contenido en base de datos y contenido en archivos locales:

- PostgreSQL guarda formularios de contacto, usuarios administradores, proyectos del portfolio y miembros del equipo.
- `data/contact-info.json` guarda el email, telefono, ubicacion, horario y texto legal mostrados en la pagina de contacto.
- `public/uploads/portfolio` guarda las imagenes subidas desde el panel de administracion.

Esto es importante si mas adelante despliegas la aplicacion en un entorno donde el sistema de archivos no sea persistente.

## Flujo recomendado para un desarrollador nuevo

```bash
npm install
docker compose up -d
npx prisma generate
npx prisma db push
npm run admin:create -- admin@empresa.com password123 "Administrador"
npm run dev
```

## Notas

- El repo espera un archivo `.env.example`, por eso se incluye en esta version del proyecto.
- Actualmente no hay un seed automatico de datos iniciales.
- Si cambias el esquema de Prisma, recuerda ejecutar de nuevo `npx prisma generate` y `npx prisma db push`.
