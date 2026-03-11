const { Dueno, Mascota } = require('../models');
const { Op } = require('sequelize');

const getRegistro = async (req, res) => {
  try {
    const busqueda = req.query.busqueda || '';
    const tab = req.query.tab || 'duenos';

    const whereDueno = busqueda ? {
      [Op.or]: [
        { nombre: { [Op.iLike]: `%${busqueda}%` } },
        { rut: { [Op.iLike]: `%${busqueda}%` } }
      ]
    } : {};

    const whereMascota = busqueda ? {
      nombre: { [Op.iLike]: `%${busqueda}%` }
    } : {};

    const duenos = await Dueno.findAll({ where: whereDueno, raw: true });
    const mascotas = await Mascota.findAll({
      where: whereMascota,
      include: [{ model: Dueno, as: 'Dueno' }]
    });

    res.render('registro', {
      duenos,
      mascotas: mascotas.map(m => m.toJSON()),
      busqueda,
      tabDuenos: tab === 'duenos',
      tabMascotas: tab === 'mascotas'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

module.exports = { getRegistro };