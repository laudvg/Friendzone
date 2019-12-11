const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/igm
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 2 },
  picture: { type: String, default: "./public/images/defaultPic.svg" },
  gender: String,
  preference: String,
  quizValue: {type: Number, required: true},
  
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

