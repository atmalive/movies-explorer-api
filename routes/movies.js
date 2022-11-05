const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');
const { regex } = require('../utils/regex');

routerMovies.get('', getSavedMovies);

routerMovies.post('', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(regex)),
    trailerLink: Joi.string().required().pattern(new RegExp(regex)),
    thumbnail: Joi.string().required().pattern(new RegExp(regex)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), saveMovie);

routerMovies.delete('/:id', celebrate({
  params: Joi.object()
    .keys({ id: Joi.string().hex().length(24) }),
}), deleteMovie);

module.exports = routerMovies;
