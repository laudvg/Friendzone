const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 2 }
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

