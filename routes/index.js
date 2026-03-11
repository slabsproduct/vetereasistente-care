const express = require('express');
const router = express.Router();
const { Dueno, Mascota, Cita } = require('../models');

router.get('/', async (req, res) => {
  const totalDuenos = await Dueno.count();
  const totalMascotas = await Mascota.count();
  const totalCitas = await Cita.count({ where: { estado: 'pendiente' } });
  res.render('home', { totalDuenos, totalMascotas, totalCitas });
});

router.get('/status', (req, res) => {
  res.json({ status: 'ok', mensaje: 'Servidor funcionando', fecha: new Date() });
});

module.exports = router;