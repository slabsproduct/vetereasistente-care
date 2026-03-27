const express = require('express');
const router = express.Router();
const { Veterinario } = require('../../models');
const verificarToken = require('../../middlewares/auth');

// Devuelve todos los usuarios sin exponer la contraseña
router.get('/', verificarToken, async (req, res) => {
  try {
    const usuarios = await Veterinario.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json({ status: 'ok', message: 'Usuarios obtenidos', data: usuarios });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;
