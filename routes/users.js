const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

routerUsers.get('/:me', getUser);

routerUsers.patch('/:me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    email: Joi.string()
      .required().min(5).max(50),
    password: Joi.string()
      .required().min(2).max(128),
  }),
}), updateUser);

module.exports = routerUsers;
