const express = require('express');
const router = express.Router();
const { getAll, getNueva, crear, completar, eliminar, getEditar, actualizar } = require('../controllers/citasController');

router.get('/', getAll);
router.get('/nueva', getNueva);
router.post('/', crear);
router.post('/:id/completar', completar);
router.post('/:id/eliminar', eliminar);
router.get('/:id/editar', getEditar);
router.post('/:id/actualizar', actualizar);

module.exports = router;