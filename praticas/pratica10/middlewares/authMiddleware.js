const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ msg: 'Token inválido' });

    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : parts[0];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

exports.gerarToken = (payload) => {
  try {
    const expiresIn = parseInt(process.env.JWT_EXPIRES, 10) || 60; 
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
};

exports.cifrarSenha = (senha) => {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
};

exports.compararSenha = (senha, hash) => {
  return bcrypt.compareSync(senha, hash);
};