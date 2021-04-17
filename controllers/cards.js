const Card = require('../models/card');

const InternalServerError = require('../errors/InternalServerError');

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

// module.exports.createCard = (req, res) => {
//   const { name, link } = req.body;
//   Card.create({ name, link, owner: req.user._id })
//     .then((card) => res.status(200).send(card))
//     .catch((err) => handleError(err, res, 'card'));
// };

// module.exports.deleteCard = (req, res) => {
//   Card.findByIdAndDelete(req.params.id)
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: card not found' })
//     )
//     .then((card) => res.status(200).send(card))
//     .catch((err) => handleError(err, res, 'card'));
// };

// module.exports.likeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.id,
//     { $addToSet: { likes: req.user._id } },
//     { new: true, runValidators: true }
//   )
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: card not found' })
//     )
//     .then((card) => res.status(200).send(card))
//     .catch((err) => handleError(err, res, 'card'));
// };

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
