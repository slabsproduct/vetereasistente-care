require('dotenv').config();
const bcrypt = require('bcryptjs');
const Veterinario = require('./models/Veterinario');
const { sequelize } = require('./models');

const crearVeterinario = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  const password = await bcrypt.hash('admin123', 10);

  await Veterinario.create({
    nombre: 'Admin',
    email: 'admin@vete.cl',
    password
  });

  console.log('✅ Veterinario creado: admin@vete.cl / admin123');
  process.exit();
};

crearVeterinario().catch(err => {
  console.log('Error:', err.message);
  process.exit();
});
