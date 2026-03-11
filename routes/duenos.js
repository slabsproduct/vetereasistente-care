const express = require('express');
const router = express.Router();
const { getAll, getNuevo, crear, getDetalle, eliminar, getEditar, actualizar } = require('../controllers/duenosController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, getAll);
router.get('/nuevo', verificarToken, getNuevo);
router.post('/', verificarToken, crear);
router.get('/:id', verificarToken, getDetalle);
router.post('/:id/eliminar', verificarToken, eliminar);
router.get('/:id/editar', verificarToken, getEditar);
router.post('/:id/actualizar', verificarToken, actualizar);

module.exports = router;