const express = require("express")
const paymentRouter = express.Router()

const {createPayment, webHook} = require('../Controllers/paymentController')
const isLoggedIn = require("../Middlewares/isLoggedIn")

paymentRouter.post("/create-payment", isLoggedIn, createPayment)
paymentRouter.post("/webhook", express.raw({ type: 'application/json' }), isLoggedIn, webHook)


module.exports = paymentRouter