const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

// signUp
// signIn

//
// getUser
// updateUser
// signOut

routerUsers.get('/users/me', getUser);

routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    about: Joi.string()
      .required().min(2).max(30),
  }),
}), updateUser);

module.exports = routerUsers;
