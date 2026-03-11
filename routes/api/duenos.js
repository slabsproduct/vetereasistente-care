const express = require('express');
const router = express.Router();
const { Dueno, Mascota } = require('../../models');
const verificarToken = require('../../middlewares/auth');

router.get('/', verificarToken, async (req, res) => {
  try {
    const duenos = await Dueno.findAll({ include: [{ model: Mascota, as: 'Mascotas' }] });
    res.json({ status: 'ok', message: 'Dueños obtenidos', data: duenos });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.id, {
      include: [{ model: Mascota, as: 'Mascotas' }]
    });
    if (!dueno) return res.status(404).json({ status: 'error', message: 'Dueño no encontrado', data: null });
    res.json({ status: 'ok', message: 'Dueño obtenido', data: dueno });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const dueno = await Dueno.create(req.body);
    res.status(201).json({ status: 'ok', message: 'Dueño creado', data: dueno });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});

router.put('/:id', verificarToken, async (req, res) => {
  try {
    await Dueno.update(req.body, { where: { id: req.params.id } });
    const dueno = await Dueno.findByPk(req.params.id);
    res.json({ status: 'ok', message: 'Dueño actualizado', data: dueno });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});

router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Dueno.destroy({ where: { id: req.params.id } });
    res.json({ status: 'ok', message: 'Dueño eliminado', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;