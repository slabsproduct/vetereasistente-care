const { Dueno, Mascota } = require('../models');
const { uploadFoto } = require('../middlewares/upload');
const fs = require('fs');
const path = require('path');

const getAll = async (req, res) => {
  try {
    const duenos = await Dueno.findAll({ raw: true });
    res.render('duenos/index', { duenos });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const getNuevo = (req, res) => {
  res.render('duenos/nuevo');
};

const crear = (req, res) => {
  uploadFoto.single('mascotaFoto')(req, res, async (err) => {
    try {
      const { rut, nombre, email, telefono, direccion, mascotaNombre, mascotaEspecie, mascotaRaza, mascotaEdad } = req.body;
      const foto = req.file ? `/img-doc-app/${req.file.filename}` : null;

      const dueno = await Dueno.create({ rut, nombre, email, telefono, direccion });

      await Mascota.create({
        nombre: mascotaNombre,
        especie: mascotaEspecie,
        raza: mascotaRaza,
        edad: mascotaEdad,
        duenoId: dueno.id,
        foto
      });

      res.redirect('/registro');
    } catch (error) {
      let mensaje = 'Ocurrió un error al guardar 😕';
      if (error.name === 'SequelizeUniqueConstraintError') {
        const campo = error.errors?.[0]?.path || '';
        const mensajes = {
          email: '📧 Ya existe un dueño registrado con ese email',
          rut: '🪪 Ya existe un dueño registrado con ese RUT',
        };
        mensaje = mensajes[campo] || '⚠️ Ya existe un registro con esos datos';
      }
      if (error.name === 'SequelizeValidationError') {
        mensaje = error.errors.map(e => e.message).join(', ');
      }
      res.render('duenos/nuevo', { error: mensaje });
    }
  });
};

const getDetalle = async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.id, {
      include: [{ model: Mascota, as: 'Mascotas' }]
    });
    res.render('duenos/detalle', { dueno: dueno.toJSON() });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.id, {
      include: [{ model: Mascota, as: 'Mascotas' }]
    });

    // Borra archivos de todas las mascotas del dueño
    for (const mascota of dueno.Mascotas) {
      if (mascota.foto) {
        const ruta = path.join(__dirname, '../views', mascota.foto);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      }
      if (mascota.carnetVacunacion) {
        const ruta = path.join(__dirname, '../views', mascota.carnetVacunacion);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      }
    }

    await Dueno.destroy({ where: { id: req.params.id } });
    res.redirect('/registro');
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const getEditar = async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.id, { raw: true });
    res.render('duenos/editar', { dueno });
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const actualizar = async (req, res) => {
  try {
    await Dueno.update(req.body, { where: { id: req.params.id } });
    res.redirect('/registro');
  } catch (err) {
    let mensaje = 'Error al actualizar 😕';
    if (err.name === 'SequelizeUniqueConstraintError') {
      const campo = err.errors?.[0]?.path || '';
      const mensajes = {
        email: '📧 Ya existe un dueño con ese email',
        rut: '🪪 Ya existe un dueño con ese RUT',
      };
      mensaje = mensajes[campo] || '⚠️ Ya existe un registro con esos datos';
    }
    const dueno = await Dueno.findByPk(req.params.id, { raw: true });
    res.render('duenos/editar', { dueno, error: mensaje });
  }
};

module.exports = { getAll, getNuevo, crear, getDetalle, eliminar, getEditar, actualizar };