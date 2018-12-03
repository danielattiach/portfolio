const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  loginType: {
    type: String
  },
  googleID: {
    type: String,
  },
  githubID: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  githubPage: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  }
});

mongoose.model('users', userSchema);
