const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Veterinario = require('../models/Veterinario');
const { getLogin, login, logout } = require('../controllers/authController');

router.get('/login', getLogin);
router.post('/login', login);
router.get('/logout', logout);

// Ruta API JWT
router.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const veterinario = await Veterinario.findOne({ where: { email } });
    if (!veterinario) {
      return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas', data: null });
    }
    const passwordValida = await bcrypt.compare(password, veterinario.password);
    if (!passwordValida) {
      return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas', data: null });
    }
    const token = jwt.sign(
      { id: veterinario.id, nombre: veterinario.nombre, email: veterinario.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ status: 'ok', message: 'Login exitoso', data: { token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;