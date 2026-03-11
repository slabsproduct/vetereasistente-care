require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const logger = require('./middlewares/logger');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({ extname: '.hbs' }));
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