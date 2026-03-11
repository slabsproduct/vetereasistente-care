# 🐾 VeteAsistente Care

Aplicación web para gestión de clínicas veterinarias desarrollada con Node.js, Express, Handlebars y PostgreSQL.

## Resumen te tecnologias

- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Motor de vistas:** Handlebars (HBS)
- **Base de datos:** PostgreSQL
- **ORM:** Sequelize
- **Autenticación:** JWT + express-session (investigacion adelantandome un poco)
- **Estilos:** CSS con efecto Liquid Glass

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo
- npm

## Instalación

1. Clonar o descomprimir el repositorio
2. Instalar dependencias:
```bash
   npm install
```
3. Crear archivo `.env` en la raíz con los siguientes valores:
```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=vetereasistente_db
   DB_USER=postgres
   DB_PASS=tu_contraseña(contraseña de postgresql)
   JWT_SECRET=vetereasistente_secret_2026
   SESSION_SECRET=vetereasistente_session_2026
```
4. Crear la base de datos en PostgreSQL:
```sql
   CREATE DATABASE vetereasistente_db;
```
5. Crear el usuario administrador:
```bash
   node seed.js
```

## Ejecución

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## Credenciales de prueba

- **Email:** admin@vete.cl
- **Contraseña:** admin123

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/login` | Inicio de sesión |
| `/` | Dashboard con estadísticas |
| `/registro` | Gestión de dueños y mascotas |
| `/citas` | Gestión de citas |
| `/status` | Estado del servidor |
| `/api/duenos` | API REST dueños |
| `/api/mascotas` | API REST mascotas |
| `/api/citas` | API REST citas |

## Estructura del proyecto
```
vetereasistente-care/
├── app.js                  → archivo principal
├── seed.js                 → crea usuario admin inicial
├── .env                    → variables de entorno
├── config/
│   └── database.js         → configuración PostgreSQL
├── models/                 → modelos Sequelize
├── controllers/            → lógica de negocio
├── routes/                 → rutas Express
│   └── api/                → endpoints RESTful
├── middlewares/            → logger y autenticación JWT
├── views/                  → plantillas Handlebars
├── public/                 → archivos estáticos
└── logs/                   → registro de visitas
```

## Decisiones técnicas

- Se usó `app.js` como archivo principal por convención en proyectos Express.
- `dotenv` maneja todas las credenciales sensibles fuera del código.
- `nodemon` solo en desarrollo para reinicio automático.
- Las rutas de la API y las vistas comparten el mismo middleware JWT.
- Sequelize con `alter:true` sincroniza los modelos sin borrar datos existentes.
- El efecto Liquid Glass se logra con `backdrop-filter: blur()` CSS nativo, sin librerías externas.