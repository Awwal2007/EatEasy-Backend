// routes/messages.js
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/isLoggedIn');
const Message = require('../Models/message');
const User = require('../Models/user');

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    
    // Check if receiver exists and is an admin (or user, depending on your logic)
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ msg: 'Receiver not found' });
    }

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content
    });

    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all conversations for current user
router.get('/conversations', auth, async (req, res) => {
  try {
    // Get distinct users you've messaged or received messages from
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user.id },
            { receiver: req.user.id }
          ]
        }
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ["$sender", req.user.id] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: "$content",
          createdAt: "$createdAt",
          isRead: "$isRead"
        }
      },
      {
        $group: {
          _id: "$otherUser",
          lastMessage: { $last: "$lastMessage" },
          createdAt: { $last: "$createdAt" },
          unreadCount: {
            $sum: {
              $cond: [
                { $eq: ["$isRead", false] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get messages between current user and another user
router.get('/:otherUserId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.otherUserId },
        { sender: req.params.otherUserId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 })
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    // Mark messages as read
    await Message.updateMany(
      {
        sender: req.params.otherUserId,
        receiver: req.user.id,
        isRead: false
      },
      { $set: { isRead: true } }
    );

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;