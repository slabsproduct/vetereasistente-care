const express = require('express');
const router = express.Router();
const { getRegistro } = require('../controllers/registroController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, getRegistro);

module.exports = router;