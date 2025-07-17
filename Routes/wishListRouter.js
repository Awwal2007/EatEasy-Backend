const express = require("express")
const wishListRouter = express.Router()
const {addToWishList, getWishList, updateWishListItem, removeWishListItem} = require("../Controllers/wishListController")
// const uploadAuthImage = require("../Config/authMulter")
const isVerified = require("../Middlewares/isVerified")
const isLoggedIn = require("../Middlewares/isLoggedIn")

wishListRouter.post("/:userId", isLoggedIn, addToWishList)
wishListRouter.get("/:userId", getWishList)
wishListRouter.put("/:id",  updateWishListItem,  isLoggedIn)
wishListRouter.delete("/:id",  isLoggedIn, removeWishListItem)

module.exports = wishListRouter