
# MasterRoaster Backend ☕

Este es el backend del sistema **MasterRoaster**, una plataforma de trazabilidad de café que permite registrar, gestionar y analizar muestras, lotes, análisis físicos y sensoriales, pedidos, entre otros. Desarrollado con Node.js, Express y Prisma ORM sobre una base de datos PostgreSQL.

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/) (opcional)

## 📁 Estructura principal

\`\`\`
src/
├── app.ts               # Entry point del servidor Express
├── config/              # Configuración de base de datos y entorno
├── controllers/         # Controladores de rutas por entidad
├── dtos/                # Data Transfer Objects para validación
├── entities/            # Clases del dominio
├── middleware/          # Middlewares personalizados (e.g., manejo de errores)
├── repositories/        # Lógica de acceso a datos (Clean Architecture)
├── routes/              # Definición de rutas REST
├── scripts/             # Seeds y scripts de utilidad
└── services/            # Lógica de negocio por entidad
\`\`\`

## ⚙️ Configuración del entorno

1. Clona el repositorio:

\`\`\`bash
git clone https://github.com/Kisa234/MasterRoaster-Backend.git
cd MasterRoaster-Backend
\`\`\`

2. Instala las dependencias:

\`\`\`bash
npm install
\`\`\`

3. Crea un archivo \`.env\` en la raíz del proyecto con el siguiente contenido:

\`\`\`dotenv
DATABASE_URL=postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_bd>
PORT=8080
\`\`\`

4. Aplica las migraciones e inicia Prisma:

\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
\`\`\`

5. (Opcional) Ejecuta el script de seed:

\`\`\`bash
npm run seed
\`\`\`

## 🧪 Scripts disponibles

\`\`\`json
"scripts": {
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "node dist/app.js",
  "seed": "ts-node src/scripts/seed.ts",
  "prisma": "npx prisma"
}
\`\`\`

- \`npm run dev\`: Inicia el servidor con hot reload.
- \`npm run build\`: Compila TypeScript a JavaScript.
- \`npm start\`: Ejecuta el build desde \`/dist\`.
- \`npm run seed\`: Pobla la base de datos con datos iniciales.
- \`npm run prisma\`: Accede a comandos Prisma.

## 📡 API REST

La API se organiza por entidad (ej: \`/lote\`, \`/analisisFisico\`, \`/pedido\`, etc.) siguiendo principios REST. Los endpoints soportan las operaciones CRUD completas. Las rutas se definen en \`src/routes/\`.

## 🧱 Arquitectura

Este proyecto sigue principios de **Clean Architecture**, separando controladores, servicios, entidades y acceso a datos (repositorios). Esto facilita la mantenibilidad, escalabilidad y testeo.


## 🧑‍💻 Autores

- Renzo Vilchez

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
