const express = require('express');
const router = express.Router();
const { getAll, getNueva, crear, completar, eliminar, getEditar, actualizar } = require('../controllers/citasController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, getAll);
router.get('/nueva', verificarToken, getNueva);
router.post('/', verificarToken, crear);
router.post('/:id/completar', verificarToken, completar);
router.post('/:id/eliminar', verificarToken, eliminar);
router.get('/:id/editar', verificarToken, getEditar);
router.post('/:id/actualizar', verificarToken, actualizar);

module.exports = router;