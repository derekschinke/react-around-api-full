const mongoose = require('mongoose');

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
          const regex = /^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;%=]+#?$/;
          return regex.test(v);
        },
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', schema);
