const express = require('express');
const router = express.Router();
const { crear, eliminar, getNueva, getEditar, actualizar } = require('../controllers/mascotasController');
const verificarToken = require('../middlewares/auth');

router.get('/nueva/:duenoId', verificarToken, getNueva);
router.post('/', verificarToken, crear);
router.post('/:id/eliminar', verificarToken, eliminar);
router.get('/:id/editar', verificarToken, getEditar);
router.post('/:id/actualizar', verificarToken, actualizar);

module.exports = router;