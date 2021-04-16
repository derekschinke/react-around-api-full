const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  // updateAvatar,
} = require('../controllers/user');

const TOKEN_REGEX = /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

router.get(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(TOKEN_REGEX).required() })
      .options({ allowUnknown: true }),
  }),
  getUsers
);

router.get(
  '/:id',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(TOKEN_REGEX).required() })
      .options({ allowUnknown: true }),
    params: Joi.object().keys({ id: Joi.string().alphanum().required() }),
  }),
  getUserById
);

router.patch(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(TOKEN_REGEX).required() })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser
);

// router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
