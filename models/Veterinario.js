const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veterinario = sequelize.define('Veterinario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Veterinario;