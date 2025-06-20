const express = require("express")
const messageRouter = express.Router()

const {
    createUserMessage,
    getAllMessages,
    getUserMessages,
    getAdminMessages,
    replyToUserMessage} = require("../Controllers/messageController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isAdmin = require("../Middlewares/isAdmin")

messageRouter.post('/', isLoggedIn, createUserMessage);
messageRouter.get('/', isLoggedIn, isAdmin, getAllMessages);
messageRouter.get('/user-messages', isLoggedIn, getUserMessages);
messageRouter.get('/admin-messages', isLoggedIn, isAdmin, getAdminMessages);
messageRouter.post('/admin-reply', isLoggedIn, isAdmin, replyToUserMessage);

module.exports = messageRouter