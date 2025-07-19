const express = require("express")
const orderRouter = express.Router()

const {getAllOrders, getMyOrders, createOrder, getSellerOrders} = require("../Controllers/orderController")
const isAdmin = require("../Middlewares/isAdmin")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isSeller = require("../Middlewares/isSeller")

orderRouter.get("/", isAdmin, isLoggedIn, getAllOrders )
orderRouter.post("/", isLoggedIn, createOrder)
orderRouter.get("/my-orders", isLoggedIn, getMyOrders)
orderRouter.get("/seller", isLoggedIn, isSeller, getSellerOrders)


module.exports = orderRouter