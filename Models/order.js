const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card'], default: 'cash' },
  paymentId: { type: String, required: true},
}, { timestamps: true });

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel