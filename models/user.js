const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
// const { regex } = require('../utils/regex');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('user', userSchema);
