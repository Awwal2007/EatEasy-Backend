const express = require("express")
const sellerRouter = express.Router()
const {signup, login, verifyEmail} = require("../Controllers/sellerController")
const isVerified = require("../Middlewares/isVerified")

sellerRouter.post("/signup", signup)
sellerRouter.post("/login",  login, isVerified)
sellerRouter.post("/verify/:token", verifyEmail)

module.exports = sellerRouter