const express = require('express');
const router = express.Router();
const { getAll, getNueva, crear, completar, eliminar } = require('../controllers/citasController');

router.get('/', getAll);
router.get('/nueva', getNueva);
router.post('/', crear);
router.post('/:id/completar', completar);
router.post('/:id/eliminar', eliminar);

module.exports = router;