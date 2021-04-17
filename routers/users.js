const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { BEARER_REGEX } = require('../utils/constants');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
      .options({ allowUnknown: true }),
  }),
  getUsers
);

router.get(
  '/:id',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
      .options({ allowUnknown: true }),
    params: Joi.object().keys({ id: Joi.string().length(24).hex().required() }),
  }),
  getUserById
);

router.patch(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser
);

router.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      avatar: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required(),
    }),
  }),
  updateAvatar
);

module.exports = router;
