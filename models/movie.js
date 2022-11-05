const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { onlyLink } = require('../utils/consts');

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
      message: onlyLink,
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: onlyLink,
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: onlyLink,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
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
