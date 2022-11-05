const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { handleErrors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routerMain } = require('./routes');
const { mongoPath } = require('./utils/config');
const { apiLimiter } = require('./utils/rateLimit');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://front.atmalivefilms.nomoredomains.icu', 'https://front.atmalivefilms.nomoredomains.icu'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'x-access-token', 'Authorization'],
  credentials: true,
};

const { PORT = 3001, MONGO_PATH, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_PATH : mongoPath, {
  useNewUrlParser: true,
});
app.use(helmet());
app.use('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(apiLimiter);
app.use('', routerMain);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
