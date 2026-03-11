const { Dueno, Mascota } = require('../models');

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

const crear = async (req, res) => {
  try {
    const { rut, nombre, email, telefono, direccion, mascotaNombre, mascotaEspecie, mascotaRaza, mascotaEdad } = req.body;
    
    const dueno = await Dueno.create({ rut, nombre, email, telefono, direccion });
    
    await Mascota.create({
      nombre: mascotaNombre,
      especie: mascotaEspecie,
      raza: mascotaRaza,
      edad: mascotaEdad,
      duenoId: dueno.id
    });

    res.redirect('/duenos');
  } catch (err) {
    let mensaje = 'Ocurrió un error al guardar 😕';

    if (err.name === 'SequelizeUniqueConstraintError') {
      const campo = err.errors?.[0]?.path || '';
      const mensajes = {
        email: '📧 Ya existe un dueño registrado con ese email',
        rut: '🪪 Ya existe un dueño registrado con ese RUT',
      };
      mensaje = mensajes[campo] || '⚠️ Ya existe un registro con esos datos';
    }

    if (err.name === 'SequelizeValidationError') {
      mensaje = err.errors.map(e => e.message).join(', ');
    }

    res.render('duenos/nuevo', { error: mensaje });
  }
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
    await Dueno.destroy({ where: { id: req.params.id } });
    res.redirect('/duenos');
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

module.exports = { getAll, getNuevo, crear, getDetalle, eliminar };