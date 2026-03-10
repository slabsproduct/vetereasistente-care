require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(logger);
app.use(express.static('public'));

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`🐾 Servidor iniciado en el puerto ${PORT}`);
});