require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const logger = require('./middlewares/logger');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b,
    formatFecha: (fecha) => {
  const d = new Date(fecha);
  const dia = String(d.getUTCDate()).padStart(2, '0');
  const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
  const anio = d.getUTCFullYear();
  return `${dia}/${mes}/${anio}`;
},
formatHora: (fecha) => {
  const d = new Date(fecha);
  const hora = String(d.getUTCHours()).padStart(2, '0');
  const minutos = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hora}:${minutos}`;
}
  }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoutes = require('./routes/index');
const duenosRoutes = require('./routes/duenos');
const mascotasRoutes = require('./routes/mascotas');
const registroRoutes = require('./routes/registro');
const citasRoutes = require('./routes/citas');
app.use('/citas', citasRoutes);
app.use('/registro', registroRoutes);
app.use('/mascotas', mascotasRoutes);

app.use('/', indexRoutes);
app.use('/duenos', duenosRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('🗄️ Base de datos conectada');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('📋 Tablas sincronizadas');
    app.listen(PORT, () => {
      console.log(`🐾 Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch(err => console.log('Error:', err));