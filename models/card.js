const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = /^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;%=]+#?$/;
          return regex.test(v);
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', schema);
