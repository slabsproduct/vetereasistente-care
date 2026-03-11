const express = require('express');
const router = express.Router();
const { Mascota, Dueno } = require('../../models');
const verificarToken = require('../../middlewares/auth');

router.get('/', verificarToken, async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({ include: [{ model: Dueno, as: 'Dueno' }] });
    res.json({ status: 'ok', message: 'Mascotas obtenidas', data: mascotas });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, {
      include: [{ model: Dueno, as: 'Dueno' }]
    });
    if (!mascota) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada', data: null });
    res.json({ status: 'ok', message: 'Mascota obtenida', data: mascota });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const mascota = await Mascota.create(req.body);
    res.status(201).json({ status: 'ok', message: 'Mascota creada', data: mascota });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});

router.put('/:id', verificarToken, async (req, res) => {
  try {
    await Mascota.update(req.body, { where: { id: req.params.id } });
    const mascota = await Mascota.findByPk(req.params.id);
    res.json({ status: 'ok', message: 'Mascota actualizada', data: mascota });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});

router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Mascota.destroy({ where: { id: req.params.id } });
    res.json({ status: 'ok', message: 'Mascota eliminada', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;