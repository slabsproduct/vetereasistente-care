const sequelize = require('../config/database');
const Dueno = require('./Dueno');
const Mascota = require('./Mascota');
const Cita = require('./Cita');
const Veterinario = require('./Veterinario');


Dueno.hasMany(Mascota, { foreignKey: { name: 'duenoId', allowNull: false }, as: 'Mascotas' });
Mascota.belongsTo(Dueno, { foreignKey: { name: 'duenoId', allowNull: false }, as: 'Dueno' });

Mascota.hasMany(Cita, { foreignKey: { name: 'mascotaId', allowNull: false }, as: 'Citas' });
Cita.belongsTo(Mascota, { foreignKey: { name: 'mascotaId', allowNull: false }, as: 'Mascota' });

module.exports = { sequelize, Dueno, Mascota, Cita, Veterinario };