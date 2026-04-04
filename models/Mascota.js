const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mascota = sequelize.define('Mascota', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: DataTypes.STRING,
  raza: DataTypes.STRING,
  edad: DataTypes.INTEGER,
  // foto de perfil de la mascota
  foto: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  // carnet de vacunación
  carnetVacunacion: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

module.exports = Mascota;