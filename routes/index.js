const routerMain = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signIn, signUp, signOut } = require('../controllers/users');
const { regex } = require('../utils/regex');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');

routerMain.post('/signin', celebrate({
  body: Joi.object().keys({ email: Joi.string().required().min(2).email(), password: Joi.string().required() }),
}), signIn);

routerMain.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regex)),
  }),
}), signUp);

routerMain.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routerMain.use(auth);

routerMain.use('/movies', routerMovies);
routerMain.use('/users', routerUsers);

routerMain.post('/signout', signOut);

module.exports = {
  routerMain,
};
