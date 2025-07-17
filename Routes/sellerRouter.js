const express = require("express")
const sellerRouter = express.Router()
const {signup, login, verifyEmail, getSellerById} = require("../Controllers/sellerController")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

const uploadAuthImage = require("../Config/authMulter")

sellerRouter.post("/signup", uploadAuthImage.single("authImage"), signup)
sellerRouter.post("/login", login)
sellerRouter.post("/verify/:token", verifyEmail)
// sellerRouter.post("/getAllSeller",  login, isVerified)
sellerRouter.post("/:id",  isLoggedIn, getSellerById )

module.exports = sellerRouter