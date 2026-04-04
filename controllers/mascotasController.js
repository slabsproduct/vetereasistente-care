const { Mascota, Dueno } = require('../models');
const { uploadFoto } = require('../middlewares/upload');
const fs = require('fs');
const path = require('path');

const getNueva = async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.duenoId);
    res.render('mascotas/nueva', { dueno });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const crear = (req, res) => {
  uploadFoto.single('foto')(req, res, async (err) => {
    try {
      const { nombre, especie, raza, edad, duenoId } = req.body;
      const foto = req.file ? `/img-doc-app/${req.file.filename}` : null;
      await Mascota.create({ nombre, especie, raza, edad, duenoId, foto });
      res.redirect(`/duenos/${duenoId}`);
    } catch (error) {
      const dueno = await Dueno.findByPk(req.body.duenoId);
      res.render('mascotas/nueva', { dueno, error: error.message });
    }
  });
};

const eliminar = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    const duenoId = mascota.duenoId;

    if (mascota.foto) {
      const ruta = path.join(__dirname, '../views', mascota.foto);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    }
    if (mascota.carnetVacunacion) {
      const ruta = path.join(__dirname, '../views', mascota.carnetVacunacion);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    }

    await mascota.destroy();
    res.redirect(`/duenos/${duenoId}`);
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const getEditar = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, { raw: true });
    res.render('mascotas/editar', { mascota });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const actualizar = (req, res) => {
  uploadFoto.single('foto')(req, res, async (err) => {
    try {
      const mascota = await Mascota.findByPk(req.params.id);

      if (req.file) {
        if (mascota.foto) {
          const rutaAnterior = path.join(__dirname, '../views', mascota.foto);
          if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
        }
        await mascota.update({ ...req.body, foto: `/img-doc-app/${req.file.filename}` });
      } else {
        await mascota.update(req.body);
      }

      res.redirect(`/duenos/${mascota.duenoId}`);
    } catch (error) {
      const mascota = await Mascota.findByPk(req.params.id, { raw: true });
      res.render('mascotas/editar', { mascota, error: 'Error al actualizar 😕' });
    }
  });
};

module.exports = { crear, eliminar, getNueva, getEditar, actualizar };