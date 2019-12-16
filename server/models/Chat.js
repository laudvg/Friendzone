const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const chatSchema = new Schema({
 chat: Array
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

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;

