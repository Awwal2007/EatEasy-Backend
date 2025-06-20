const Message = require("../Models/message");

// Create a new user message
const createUserMessage = async (req, res, next) => {
  try {
    const messageData = {
      ...req.body,
      sender: req.user?._id,
      user: req.user?._id
    };

    const newMessage = await Message.create(messageData);

    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: newMessage
    });
  } catch (error) {
    console.error("Create User Message Error:", error);
    next(error);
  }
};

// Get all messages (admin or support role ideally)
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "All messages fetched successfully",
      data: messages
    });
  } catch (error) {
    console.error("Get All Messages Error:", error);
    next(error);
  }
};

// Get messages for the logged-in user
const getUserMessages = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const messages = await Message.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: messages.length > 0 ? "Your messages" : "No messages yet",
      data: messages
    });
  } catch (error) {
    console.error("Get User Messages Error:", error);
    next(error);
  }
};

// Get messages for the admin (sent replies)
const getAdminMessages = async (req, res, next) => {
  try {
    const adminId = req.user?._id;
    const messages = await Message.find({ admin: adminId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: messages.length > 0 ? "Admin messages loaded" : "No replies sent yet",
      data: messages
    });
  } catch (error) {
    console.error("Get Admin Messages Error:", error);
    next(error);
  }
};

// Admin replies to a user message
const replyToUserMessage = async (req, res, next) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        status: "error",
        message: "Both message and userId are required"
      });
    }

    const reply = await Message.create({
      message,
      user: userId,
      admin: req.user?._id,
      sender: req.user?._id
    });

    res.status(201).json({
      status: "success",
      message: "Reply sent successfully",
      data: reply
    });
  } catch (error) {
    console.error("Reply to User Message Error:", error);
    next(error);
  }
};

module.exports = {
  createUserMessage,
  getAllMessages,
  getUserMessages,
  getAdminMessages,
  replyToUserMessage
};
