const express = require('express');
const router = express.Router();

router.use('/duenos', require('./duenos'));
router.use('/mascotas', require('./mascotas'));
router.use('/citas', require('./citas'));
router.use('/usuarios', require('./usuarios'));
router.use('/upload', require('./upload'));

module.exports = router;