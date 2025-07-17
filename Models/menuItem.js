const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String,  },
  image: { type: String, required: true },
  rating: { type: Number, required: true,  default: 1, max: 5},
  prepTime: {type: String},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
}, { timestamps: true });

const foodSchema = mongoose.model('MenuItem', menuItemSchema);
module.exports = foodSchema