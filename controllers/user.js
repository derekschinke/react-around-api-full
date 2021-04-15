const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
// const NotFoundError = require('../errors/NotFoundError');
// const UnauthorizedError = require('../errors/UnauthorizedError');

const User = require('../models/user');

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// module.exports.getUserById = (req, res) => {
//   User.findById(req.params.id)
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: user not found' })
//     )
//     .then((user) => res.status(200).send(user))
//     .catch((err) => handleError(err, res, 'user'));
// };

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Unable to create user');
      } else if (err.name === 'MongoError') {
        throw new ConflictError('User already exists');
      }
      next(err);
    })
    .catch(next);
};

// module.exports.updateUser = (req, res) => {
//   User.findByIdAndUpdate(
//     req.user._id,
//     { $set: { name: req.body.name, about: req.body.about } },
//     { new: true, runValidators: true }
//   )
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: user not found' })
//     )
//     .then((user) => res.status(200).send(user))
//     .catch((err) => handleError(err, res, 'user'));
// };

// module.exports.updateAvatar = (req, res) => {
//   User.findByIdAndUpdate(
//     req.user._id,
//     { $set: { avatar: req.body.avatar } },
//     { new: true, runValidators: true }
//   )
//     .orFail(() =>
//       res.status(404).send({ message: 'Not Found: user not found' })
//     )
//     .then((user) => res.status(200).send(user))
//     .catch((err) => handleError(err, res, 'user'));
// };

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Incorect email or password');
      }

      const token = jwt.sign(
        { _id: req._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );

      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOny: true });
      res.status(200).send({ token });
    })
    .catch(next);
};
