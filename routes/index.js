const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    mensaje: 'Servidor funcionando correctamente',
    fecha: new Date()
  });
});

module.exports = router;