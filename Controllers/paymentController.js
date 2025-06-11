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
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.endpointSecret;
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (error) {
        console.log(error)
        next(error);       
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

     if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const userId = paymentIntent.metadata.userId;
        
        // Update order status in your database
        await Order.updateOne(
        { user: userId, status: ('pending', 'confirmed') },
        { $set: {paymentStatus: 'paid', status: 'paid', paymentId: paymentIntent.id } }
        );
    }

    res.json({ received: true });
}

module.exports = {
    createPayment,
    webHook
}