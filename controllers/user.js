const bcrypt = require('bcrypt');

const User = require('../models/user');

const handleError = require('../helpers/handleError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res, 'user'));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() =>
      res.status(404).send({ message: 'Not Found: user not found' })
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, about: req.body.about } },
    { new: true, runValidators: true }
  )
    .orFail(() =>
      res.status(404).send({ message: 'Not Found: user not found' })
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    { new: true, runValidators: true }
  )
    .orFail(() =>
      res.status(404).send({ message: 'Not Found: user not found' })
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));
};
