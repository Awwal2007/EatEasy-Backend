const express = require("express")
const messageRouter = express.Router()

const {createMessage, getAllMessages, } = require("../Controllers/messageController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isAdmin = require("../Middlewares/isAdmin")

messageRouter.post("/", isLoggedIn, createMessage)
messageRouter.get("/", isLoggedIn, getAllMessages)

module.exports = messageRouter