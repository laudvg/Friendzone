const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const messageSchema = new Schema({
 message: String
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

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
