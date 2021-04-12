const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
      default: 'Jacques Cousteau',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
      default: 'Explorer',
    },
    avatar: {
      type: String,
      required: true,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      validate: {
        validator: (url) =>
          validator.isURL(url, {
            protocols: ['http', 'https'],
            require_protocol: true,
            require_valid_protocol: true,
            validate_length: true,
          }),
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { validator: (email) => validator.isEmail(email) },
    },
    password: { type: String, required: true, select: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', schema);
