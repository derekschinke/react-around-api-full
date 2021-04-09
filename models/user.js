const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return validator.isURL(v, {
            protocols: ['http', 'https'],
            require_protocol: true,
            require_valid_protocol: true,
            validate_length: true,
          });
        },
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', schema);
