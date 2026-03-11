const express = require('express');
const router = express.Router();
const { Cita, Mascota, Dueno } = require('../../models');
const verificarToken = require('../../middlewares/auth');

router.get('/', verificarToken, async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: { model: Mascota, as: 'Mascota', include: [{ model: Dueno, as: 'Dueno' }] },
      order: [['fecha', 'ASC']]
    });
    res.json({ status: 'ok', message: 'Citas obtenidas', data: citas });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    res.status(201).json({ status: 'ok', message: 'Cita creada', data: cita });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});

router.put('/:id/completar', verificarToken, async (req, res) => {
  try {
    await Cita.update({ estado: 'completada' }, { where: { id: req.params.id } });
    const cita = await Cita.findByPk(req.params.id);
    res.json({ status: 'ok', message: 'Cita completada', data: cita });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Cita.destroy({ where: { id: req.params.id } });
    res.json({ status: 'ok', message: 'Cita eliminada', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;