const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { BEARER_REGEX } = require('../utils/constants');

const {
  getCards,
  createCard,
  // deleteCard,
  // likeCard,
  // unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    headers: Joi.object()
      .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
      .options({ allowUnknown: true }),
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required(),
      likes: Joi.array().items(Joi.string()),
    }),
  }),
  createCard
);

// router.delete('/cards/:id', deleteCard);
// router.put('/cards/:id/likes', likeCard);
// router.delete('/cards/:id/likes', unlikeCard);

module.exports = router;
