const orderModel = require("../Models/order")
const stripe = require('stripe')(process.env.stripe_secret_key)

const createPayment = async (req, res, next)=>{
    const {totalAmount} = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, 
            currency: 'ngn',
            metadata: { userId: req.user.toString() }
        });
        // res.json({ clientSecret: paymentIntent.client_secret });
        if(!paymentIntent){
            return res.status(500).json({
                status: "error",
                message: "payment failed"
            })
        }

        res.status(201).json({
            status: "success",
            message: "payment intent created successfully",
            clientSecret: paymentIntent.client_secret,
            paymentIntent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Payment Failed"
        })
        next(error)
    }
}

const webHook = async (req, res, next)=>{
    
}

module.exports = {
    createPayment,
}