const express = require('express');
const router = express.Router();
const { crear, eliminar, getNueva, getEditar, actualizar } = require('../controllers/mascotasController');


router.get('/nueva/:duenoId', getNueva);
router.post('/', crear);
router.post('/:id/eliminar', eliminar);
router.get('/:id/editar', getEditar);
router.post('/:id/actualizar', actualizar);

module.exports = router;