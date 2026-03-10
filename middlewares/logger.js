const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const fecha = new Date().toLocaleDateString('es-CL');
  const hora = new Date().toLocaleTimeString('es-CL');
  const ruta = req.url;

  const registro = `${fecha} ${hora} - ${ruta}\n`;

  // Ruta del archivo de log, modificar si se quiere otro destino
  const rutaLog = path.join(__dirname, '../logs/log.txt');

  fs.appendFile(rutaLog, registro, (err) => {
    if (err) console.log('Error al escribir el log:', err);
  });

  next();
};

module.exports = logger;