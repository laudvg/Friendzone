const express = require("express");
const passport = require('passport');
const router = express.Router();
const Message = require("../../models/Message");
const Chat = require("../../models/Chat");
const uploader = require('../../configs/cloudinary.configs');

router.post('/message', (req, res, next) => {
  const sendMessage = req.body;
  Message.findOneAndUpdate(
    req.message._id,
    {message: sendMessage},
    { new: true }
  ).then(messagesUpdated => res.json(messagesUpdated));
});