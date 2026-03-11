const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.session?.token;

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