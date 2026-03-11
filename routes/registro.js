const express = require('express');
const router = express.Router();
const { getRegistro } = require('../controllers/registroController');

router.get('/', getRegistro);

module.exports = router;