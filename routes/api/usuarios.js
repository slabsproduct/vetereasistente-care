const express = require('express');
const router = express.Router();
const { Veterinario } = require('../../models');
const verificarToken = require('../../middlewares/auth');

// GET todos los usuarios sin password
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

// PUT actualizar usuario por id
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await Veterinario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
    }
    // Solo permite actualizar nombre y email, no la password directamente
    const { nombre, email } = req.body;
    await usuario.update({ nombre, email });
    res.json({ status: 'ok', message: 'Usuario actualizado', data: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

// DELETE eliminar usuario por id con validación previa
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await Veterinario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado', data: null });
    }
    await usuario.destroy();
    res.json({ status: 'ok', message: 'Usuario eliminado correctamente', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});
const bcrypt = require('bcryptjs');

// POST crear usuario
router.post('/', verificarToken, async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Veterinario.create({ nombre, email, password: hash });
    res.status(201).json({ status: 'ok', message: 'Usuario creado', data: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message, data: null });
  }
});
module.exports = router;