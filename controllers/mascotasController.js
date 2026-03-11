const { Mascota, Dueno } = require('../models');

const crear = async (req, res) => {
  try {
    await Mascota.create(req.body);
    res.redirect(`/duenos/${req.body.duenoId}`);
  } catch (err) {
    res.redirect(`/duenos/${req.body.duenoId}?error=${err.message}`);
  }
};

const eliminar = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    const duenoId = mascota.duenoId;
    await mascota.destroy();
    res.redirect(`/duenos/${duenoId}`);
  } catch (err) {
    res.status(500).json({ status: 'error', mensaje: err.message });
  }
};

const getNueva = async (req, res) => {
  try {
    const dueno = await Dueno.findByPk(req.params.duenoId);
    res.render('mascotas/nueva', { dueno });
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

const actualizar = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    await mascota.update(req.body);
    res.redirect(`/duenos/${mascota.duenoId}`);
  } catch (err) {
    const mascota = await Mascota.findByPk(req.params.id, { raw: true });
    res.render('mascotas/editar', { mascota, error: 'Error al actualizar 😕' });
  }
};
module.exports = { crear, eliminar, getNueva, getEditar, actualizar };