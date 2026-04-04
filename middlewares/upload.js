const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'views/img-doc-app/');
  },
  filename: (req, file, cb) => {
    const nombreUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nombreUnico);
  }
});

const validarImagen = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png/;
  const extValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  // aceptamos octet-stream porque Postman a veces lo envía así
  const mimeValido = tiposPermitidos.test(file.mimetype) || file.mimetype === 'application/octet-stream';

  if (extValida && mimeValido) {
    cb(null, true);
  } else {
    cb(new Error('❌ Solo se permiten imágenes JPG o PNG'));
  }
};

const validarDocumento = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|pdf/;
  const extValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const mimeValido = tiposPermitidos.test(file.mimetype) || file.mimetype === 'application/octet-stream';

  if (extValida && mimeValido) {
    cb(null, true);
  } else {
    cb(new Error('❌ Solo se permiten imágenes o PDF para el carnet'));
  }
};

const uploadFoto = multer({ storage, fileFilter: validarImagen, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadCarnet = multer({ storage, fileFilter: validarDocumento, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { uploadFoto, uploadCarnet };