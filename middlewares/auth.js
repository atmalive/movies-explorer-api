const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuntificationError = require('../errors/AuntificationError');
const { needToAuth, production, devSecret } = require('../utils/consts');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new AuntificationError(needToAuth);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === production ? JWT_SECRET : devSecret);
  } catch (err) {
    next(new AuntificationError(needToAuth));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
