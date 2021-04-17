const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      throw new InternalServerError('An error has occurred on the server');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'Validation Error') {
        throw new BadRequestError('Unable to create card');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card && req.user._id.toString() === card.owner.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          res.status(200).send(deletedCard);
        });
      } else if (!card) {
        throw new NotFoundError('Card not found');
      } else {
        throw new UnauthorizedError('Authorization required');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else if (!card) {
        throw new NotFoundError('Card not found');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 404) {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

// module.exports.unlikeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.id,
//     { $pull: { likes: req.user._id } },
//     { new: true, runValidators: true }
//   )
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: card not found' })
//     )
//     .then((card) => res.status(200).send(card))
//     .catch((err) => handleError(err, res, 'card'));
// };
