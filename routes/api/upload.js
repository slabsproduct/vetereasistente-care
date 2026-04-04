const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { uploadFoto, uploadCarnet } = require('../../middlewares/upload');
const verificarToken = require('../../middlewares/auth');
const { Mascota } = require('../../models');

// Subir foto de mascota
router.post('/mascota/:id/foto', verificarToken, (req, res, next) => {
  uploadFoto.single('archivo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message, data: null });
    }
    try {
      const mascota = await Mascota.findByPk(req.params.id);
      if (!mascota) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada', data: null });
      if (!req.file) return res.status(400).json({ status: 'error', message: 'No se recibió ningún archivo', data: null });

      if (mascota.foto) {
        const rutaAnterior = path.join(__dirname, '../../public', mascota.foto);
        if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
      }

      await mascota.update({ foto: `/img-doc-app/${req.file.filename}` });
      res.json({ status: 'ok', message: 'Foto subida correctamente', data: { url: `/uploads/${req.file.filename}` } });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message, data: null });
    }
  });
});
// Subir carnet de vacunación
router.post('/mascota/:id/carnet', verificarToken, (req, res, next) => {
  uploadCarnet.single('archivo')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message, data: null });
    }
    try {
      const mascota = await Mascota.findByPk(req.params.id);
      if (!mascota) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada', data: null });
      if (!req.file) return res.status(400).json({ status: 'error', message: 'No se recibió ningún archivo', data: null });

      if (mascota.carnetVacunacion) {
        const rutaAnterior = path.join(__dirname, '../../public', mascota.carnetVacunacion);
        if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
      }

      await mascota.update({ carnetVacunacion: `/img-doc-app/${req.file.filename}` });
      res.json({ status: 'ok', message: 'Carnet subido correctamente', data: { url: `/uploads/${req.file.filename}` } });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message, data: null });
    }
  });
});
// Eliminar foto de mascota
router.delete('/mascota/:id/foto', verificarToken, async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (!mascota) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada', data: null });
    if (!mascota.foto) return res.status(404).json({ status: 'error', message: 'La mascota no tiene foto', data: null });

    const ruta = path.join(__dirname, '../../views', mascota.foto);
    if (fs.existsSync(ruta)) fs.unlinkSync(ruta);

    await mascota.update({ foto: null });
    res.json({ status: 'ok', message: 'Foto eliminada correctamente', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

// Eliminar carnet de vacunación
router.delete('/mascota/:id/carnet', verificarToken, async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (!mascota) return res.status(404).json({ status: 'error', message: 'Mascota no encontrada', data: null });
    if (!mascota.carnetVacunacion) return res.status(404).json({ status: 'error', message: 'La mascota no tiene carnet', data: null });

    const ruta = path.join(__dirname, '../../views', mascota.carnetVacunacion);
    if (fs.existsSync(ruta)) fs.unlinkSync(ruta);

    await mascota.update({ carnetVacunacion: null });
    res.json({ status: 'ok', message: 'Carnet eliminado correctamente', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message, data: null });
  }
});

module.exports = router;