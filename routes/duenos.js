const express = require('express');
const router = express.Router();
const { getAll, getNuevo, crear, getDetalle, eliminar, getEditar, actualizar } = require('../controllers/duenosController');

router.get('/', getAll);
router.get('/nuevo', getNuevo);
router.post('/', crear);
router.get('/:id', getDetalle);
router.post('/:id/eliminar', eliminar);
router.get('/:id/editar', getEditar);
router.post('/:id/actualizar', actualizar);


module.exports = router;