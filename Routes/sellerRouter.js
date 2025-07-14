const express = require("express")
const sellerRouter = express.Router()
const {signup, login, verifyEmail, getSellerById} = require("../Controllers/sellerController")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

sellerRouter.post("/signup", signup)
sellerRouter.post("/login",  login, isVerified)
sellerRouter.post("/verify/:token", verifyEmail)
// sellerRouter.post("/getAllSeller",  login, isVerified)
sellerRouter.post("/:id", getSellerById, isVerified, isLoggedIn )

module.exports = sellerRouter