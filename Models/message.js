// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   senderId: { type: String, required: true, default: " "},
//   message: { type: String, required: true },
//   timestamp: { type: String, required: true},
// }, { timestamps: true });

// const messageModel = mongoose.model('Message', messageSchema);
// module.exports = messageModel

// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    ref: 'admin',
    // required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel