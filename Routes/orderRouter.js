const express = require("express")
const orderRouter = express.Router()

const {getAllOrders, getMyOrders, createOrder} = require("../Controllers/orderController")
const isAdmin = require("../Middlewares/isAdmin")
const isLoggedIn = require("../Middlewares/isLoggedIn")

orderRouter.get("/", isAdmin, isLoggedIn, getAllOrders )
orderRouter.post("/", isLoggedIn, createOrder)
orderRouter.get("/my-orders", getMyOrders, isLoggedIn)


module.exports = orderRouter