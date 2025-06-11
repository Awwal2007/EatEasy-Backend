const express = require("express")
const paymentRouter = express.Router()

const {createPayment} = require('../Controllers/paymentController')
const isLoggedIn = require("../Middlewares/isLoggedIn")

paymentRouter.post("/create-payment-intent", isLoggedIn, createPayment)


module.exports = paymentRouter