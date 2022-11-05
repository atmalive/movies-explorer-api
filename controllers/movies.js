const Movie = require('../models/movie');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NoRight = require('../errors/NoRight');
const NotCorrectData = require('../errors/NotCorrectData');
const { castError, filmDelete, validationError } = require('../utils/consts');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === validationError) {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(ERRORS.DEFAULT_ERROR.MOVIES))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoRight(ERRORS.NO_RIGHT.USER_ERROR);
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ message: filmDelete }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === castError) {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies, saveMovie, deleteMovie,
};
