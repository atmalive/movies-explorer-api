const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuntificationError = require('../errors/AuntificationError');
const { ERRORS } = require('../utils/errors');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectData = require('../errors/NotCorrectData');
const IsUser = require('../errors/IsUser');
const {
  validationError, tokenName, allRight, castError, youAreOut, production, devSecret,
} = require('../utils/consts');
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
    .catch((err) => {
      if (err.code === 11000) {
        next(new IsUser(ERRORS.IS_USER.USER_ERROR));
      } else {
        next(err);
      }
    });
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
          NODE_ENV === production ? JWT_SECRET : devSecret,
          { expiresIn: '7d' },
        );
        res.cookie(tokenName, token, { httpOnly: true, sameSite: true });
        res.send({ message: allRight });
      })
      .catch(next))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(ERRORS.NOT_FOUND.USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === castError) {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { $set: { name, email } },
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
      if (err.name === validationError) {
        next(new NotCorrectData(ERRORS.VALIDATION.GENERAL));
      } else if (err.code === 11000) {
        next(new IsUser(ERRORS.IS_USER.USER_ERROR));
      } else {
        next(err);
      }
    });
};

const signOut = (req, res) => {
  res.clearCookie(tokenName);
  res.send({ message: youAreOut });
};

module.exports = {
  signUp, signIn, signOut, getUser, updateUser,
};
