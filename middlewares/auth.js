const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
   const tokenSesion = req.session?.token;
  const tokenHeader = req.headers['authorization']?.split(' ')[1];
  const token = tokenSesion || tokenHeader;

  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.veterinario = decoded;
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

module.exports = verificarToken;