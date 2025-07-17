const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [{
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, },
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
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  address: { type: String, required: true },
  deliveryInstructions: { type: String, },
  paymentMethod: { type: String, enum: ['cash', 'card'], default: 'cash' },
  // paymentId: { type: String, required: true},
}, { timestamps: true });

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel