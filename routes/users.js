const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

routerUsers.get('/:me', getUser);

routerUsers.patch('/:me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUser);

module.exports = routerUsers;
