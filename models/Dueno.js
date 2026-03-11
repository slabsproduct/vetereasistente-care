const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dueno = sequelize.define('Dueno', {
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: DataTypes.STRING,
  direccion: DataTypes.STRING
});

module.exports = Dueno;