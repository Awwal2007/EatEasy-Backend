const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum:["chew", "swallow"], default: "chew" },
    image: { type: String, required: true },
    rating: { type: Number, required: true,  default: 1, max: 5, unique: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: { type: Number, default: 1 },
    subTotal: { type: Number, default: 0 },
    productId: {type: String, required: true},
    
}, { timestamps: true });


const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel