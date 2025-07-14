const express = require("express")
const authRouter = express.Router()
const {signup, login, verifyEmail} = require("../Controllers/authController")
const uploadAuthImage = require("../Config/authMulter")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

authRouter.post("/signup", uploadAuthImage.single("profilePicture"), signup)
authRouter.post("/login", login, isVerified)
authRouter.post("/verify/:token", verifyEmail)

module.exports = authRouter