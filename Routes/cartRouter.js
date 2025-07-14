const express = require("express")
const cartRouter = express.Router()
const {addToCart, getCart, updateCartItem, removeCartItem} = require("../Controllers/cartController")
// const uploadAuthImage = require("../Config/authMulter")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

cartRouter.post("/", addToCart, isLoggedIn)
cartRouter.get("/", getCart)
cartRouter.put("/:id",  updateCartItem, isVerified, isLoggedIn)
cartRouter.delete("/:id", removeCartItem, isLoggedIn)

module.exports = cartRouter