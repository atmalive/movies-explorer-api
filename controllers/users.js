const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuntificationError = require('../errors/AuntificationError');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectData = require('../errors/NotCorrectData');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((userData) => {
      res.send({
        name: userData.name, email: userData.email,
      });
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(new AuntificationError(ERRORS.AUNTIFICATION_ERROR.USER_ERROR))
    .then((user) => bcrypt.compare(password, user.password)
      .then((result) => {
        if (!result) {
          throw new AuntificationError(ERRORS.AUNTIFICATION_ERROR.USER_ERROR);
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res.cookie('token', token, { httpOnly: true, sameSite: true });
        res.send({ message: 'Все верно!' });
      })
      .catch(next))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

const signOut = (req, res) => {
  res.clearCookie('token');
  res.send({ message: 'Вы вышли!' });
};

module.exports = {
  signUp, signIn, signOut, getUser, updateUser,
};
