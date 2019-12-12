const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  gender: String,
  preference: String,
  quizValue: Number,

}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.createdAt;
      return ret;
    }
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;

