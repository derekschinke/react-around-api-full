import User from '../models/user';

import handleError from '../helpers/handleError';

export const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res, 'user'));

export const getUserById = (req, res) =>
  User.findById(req.params.id)
    .orFail(() =>
      res.status(404).send({ message: 'Not Found: user not found' })
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res, 'user'));
};

export const updateUser = (req, res) =>
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

export const updateAvatar = (req, res) =>
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
