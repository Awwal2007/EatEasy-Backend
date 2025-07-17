const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String,  },
    image: { type: String, required: true },
    rating: { type: Number, required: true,  default: 1, max: 5, unique: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    quantity: { type: Number, default: 1 },
    subTotal: { type: Number, default: 0 },
    productId: {type: String, required: true},
    
}, { timestamps: true });


const wishList = mongoose.model('wishList', wishListSchema);

module.exports = wishList