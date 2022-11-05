const routerMain = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signUp, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { ERRORS } = require('../utils/errors');

routerMain.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
  }),
}), signIn);

routerMain.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
  }),
}), signUp);

routerMain.use(auth);

routerMain.use('/movies', routerMovies);
routerMain.use('/users', routerUsers);

routerMain.post('/signout', signOut);

routerMain.use('*', () => {
  throw new NotFoundError(ERRORS.NOT_FOUND.BAD_WAY);
});

module.exports = {
  routerMain,
};
