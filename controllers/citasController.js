const { Cita, Mascota, Dueno } = require('../models');

const getAll = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: {
        model: Mascota,
        as: 'Mascota',
        include: [{ model: Dueno, as: 'Dueno' }]
      },
      order: [['fecha', 'ASC']]
    });
    res.render('citas/index', { citas: citas.map(c => c.toJSON()) });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const getNueva = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({
      include: [{ model: Dueno, as: 'Dueno' }]
    });
    res.render('citas/nueva', { mascotas: mascotas.map(m => m.toJSON()) });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const crear = async (req, res) => {
  try {
    const { mascotaId, fechaDia, fechaHora, motivo } = req.body;
    const fecha = new Date(`${fechaDia}T${fechaHora}`);

    if (fecha < new Date()) {
      const mascotas = await Mascota.findAll({ include: [{ model: Dueno, as: 'Dueno' }] });
      return res.render('citas/nueva', {
        mascotas: mascotas.map(m => m.toJSON()),
        error: '📅 No puedes crear una cita en el pasado 😅'
      });
    }

    await Cita.create({ mascotaId, fecha, motivo });
    res.redirect('/citas');
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const completar = async (req, res) => {
  try {
    await Cita.update({ estado: 'completada' }, { where: { id: req.params.id } });
    res.redirect('/citas');
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const eliminar = async (req, res) => {
  try {
    await Cita.destroy({ where: { id: req.params.id } });
    res.redirect('/citas');
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

module.exports = { getAll, getNueva, crear, completar, eliminar };