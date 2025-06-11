const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum:["chew", "swallow"], default: "chew" },
  image: { type: String, required: true },
  createdBy: {type: String, require: true}
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);