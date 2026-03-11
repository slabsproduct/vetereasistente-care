const express = require('express');
const router = express.Router();
const { crear, eliminar, getNueva } = require('../controllers/mascotasController');

router.get('/nueva/:duenoId', getNueva);
router.post('/', crear);
router.post('/:id/eliminar', eliminar);

module.exports = router;