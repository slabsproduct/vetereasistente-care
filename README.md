# 🐾 VeteAsistente Care

App web para gestión de citas veterinarias desarrollada con Node.js y Express.


## Estructura del proyecto 10/03/2026
```
vetereasistente-care/
├── app.js              → archivo principal
├── routes/             → rutas de la app
├── controllers/        → lógica de cada ruta
├── middlewares/        → funciones intermedias
├── public/             → archivos estáticos
└── logs/               → registro de visitas
```New-Item routes/index.js


- Se usó `app.js` como archivo principal por convención en proyectos Express.
- Se usa `dotenv` para manejar el puerto y futuras credenciales de base de datos.
- `nodemon` solo en desarrollo para reinicio automático del servidor.