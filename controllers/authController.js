const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Veterinario = require('../models/Veterinario');

const getLogin = (req, res) => {
  if (req.session?.token) return res.redirect('/');
  res.render('auth/login', { esLogin: true });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const veterinario = await Veterinario.findOne({ where: { email } });

    if (!veterinario) {
      return res.render('auth/login', { error: '❌ Email o contraseña incorrectos' });
    }

    const passwordValida = await bcrypt.compare(password, veterinario.password);
    if (!passwordValida) {
      return res.render('auth/login', { error: '❌ Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: veterinario.id, nombre: veterinario.nombre, email: veterinario.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    req.session.token = token;
    res.redirect('/');
  } catch (err) {
    res.render('auth/login', { error: 'Error al iniciar sesión 😕' });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports = { getLogin, login, logout };