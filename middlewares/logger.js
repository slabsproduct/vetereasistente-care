const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const fecha = new Date().toLocaleDateString('es-CL');
  const hora = new Date().toLocaleTimeString('es-CL');
  const registro = `${fecha} ${hora} - ${req.method} ${req.url}\n`;
  const rutaLog = path.join(__dirname, '../logs/log.txt');

  fs.appendFile(rutaLog, registro, (err) => {
    if (err) console.log('Error al escribir el log:', err);
  });

  next();
};

module.exports = logger;