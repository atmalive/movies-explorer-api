const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
// const { regex } = require('../utils/regex')

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'можно только линк',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'можно только линк',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'можно только линк',
    },
  },

  owner: {
    type: String,
    required: true,
  },

  movieId: {
    type: String,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movies', movieSchema);
