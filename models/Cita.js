const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cita = sequelize.define('Cita', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: DataTypes.STRING,
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada'),
    defaultValue: 'pendiente'
  }
});

module.exports = Cita;