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

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
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

module.exports = mongoose.model('Message', MessageSchema);