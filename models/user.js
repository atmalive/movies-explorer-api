const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { mailIsNotRequired } = require('../utils/consts');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: mailIsNotRequired,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('user', userSchema);
