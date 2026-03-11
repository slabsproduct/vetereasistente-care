const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mascota = sequelize.define('Mascota', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: DataTypes.STRING,
  raza: DataTypes.STRING,
  edad: DataTypes.INTEGER
});

module.exports = Mascota;