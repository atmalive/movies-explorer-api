module.exports.ERRORS = {
  NOT_FOUND: {
    ERROR_CODE: 404,
    MOVIES: 'Фильм с указанным _id не найден.',
    MOVIES_LIKE: 'Передан несуществующий _id фильма.',
    USER: 'Пользователь по указанному _id не найден.',
    BAD_WAY: 'Неправильный путь',
    USER_ID: 'Пользователь по указанному _id не найден.',

  },
  VALIDATION: {
    ERROR_CODE: 400,
    MOVIES: 'Переданы некорректные данные в методы создания фильма.',
    USER: 'Переданы некорректные данные при создании пользователя.',
    USER_ME: 'Переданы некорректные данные при обновлении профиля.',
    GENERAL: 'Переданы некорректные данные',
  },

  DEFAULT_ERROR: {
    ERROR_CODE: 500,
    MOVIES: 'Ошибка по-умолчанию.',
    USER: 'Ошибка по-умолчанию.',
  },
  AUNTIFICATION_ERROR: {
    ERROR_CODE: 401,
    USER_ERROR: 'Ошибка авторизации.',
  },
  NO_RIGHT: {
    ERROR_CODE: 403,
    USER_ERROR: 'Нет прав.',
  },
  IS_USER: {
    ERROR_CODE: 409,
    USER_ERROR: 'Такой пользователь уже зареган.',
  },
};

module.exports.MONGOOSE_ERR = {
  VALIDERR: 'ValidationError',
  CASTERR: 'CastError',
};
