const express = require("express")
const cartRouter = express.Router()
const {addToCart, getCart, updateCartItem, removeCartItem, removeCartItemsAfterOrdered} = require("../Controllers/cartController")
// const uploadAuthImage = require("../Config/authMulter")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

cartRouter.post("/:userId", isLoggedIn, addToCart)
cartRouter.get("/:userId", getCart)
cartRouter.put("/:id",  updateCartItem,  isLoggedIn)
cartRouter.delete("/:id",  isLoggedIn, removeCartItem)
cartRouter.delete("/",  isLoggedIn, removeCartItemsAfterOrdered)

module.exports = cartRouter