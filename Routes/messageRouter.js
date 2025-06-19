const express = require("express")
const messageRouter = express.Router()

const {createMessage, getAllMessages, createAdminMessage} = require("../Controllers/messageController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isAdmin = require("../Middlewares/isAdmin")

messageRouter.post("/", isLoggedIn, createMessage)
messageRouter.get("/", isLoggedIn, getAllMessages)
messageRouter.get("/admin-message", isAdmin, createAdminMessage)

module.exports = messageRouter