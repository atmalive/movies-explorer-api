const Movie = require('../models/movie');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NoRight = require('../errors/NoRight');
const NotCorrectData = require('../errors/NotCorrectData');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.params.owner })
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
    owner,
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
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(ERRORS.DEFAULT_ERROR.MOVIES))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoRight(ERRORS.NO_RIGHT.USER_ERROR);
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ message: 'фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies, saveMovie, deleteMovie,
};
