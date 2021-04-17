const router = require('express').Router();

// const BEARER_REGEX = require('../utils/constants');

const {
  getCards,
  // createCard,
  // deleteCard,
  // likeCard,
  // unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
// router.post('/cards', createCard);
// router.delete('/cards/:id', deleteCard);
// router.put('/cards/:id/likes', likeCard);
// router.delete('/cards/:id/likes', unlikeCard);

module.exports = router;
