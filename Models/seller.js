const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const sellerSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    validate: {
      validator: function(v) {
        return /^(\+234|0)[789][01]\d{8}$/.test(v); // Basic international phone validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },  
  // Restaurant Information
  restaurantName: {
    type: String,
    required: [true, 'Please provide your restaurant name'],
    trim: true
  },
  cuisineType: {
    type: String,
    required: [true, 'Please specify cuisine type'],
    enum: [
      'Italian',
      'Mexican',
      'Chinese',
      'Indian',
      'American',
      'Japanese',
      'Mediterranean',
      'Other'
    ]
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Location Information
  address: {
    type: String,
    required: [true, 'Please provide your address']
  },
  city: {
    type: String,
    required: [true, 'Please provide your city']
  },
  state: {
    type: String,
    required: [true, 'Please provide your state']
  },
  zipCode: {
    type: String,
    required: [true, 'Please provide your zip code']
  },
  deliveryRadius: {
    type: Number,
    required: [true, 'Please specify delivery radius'],
    min: 1,
    max: 20,
    default: 5 // miles
  },
  
  // Business Hours
  openingTime: {
    type: String,
    required: [true, 'Please specify opening time'],
    default: '09:00'
  },
  closingTime: {
    type: String,
    required: [true, 'Please specify closing time'],
    default: '21:00'
  },
  
  
  // Status and Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verificationToken: String,

  verificationTokenExp: Date,
  
  // Ratings and Stats
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not exceed 5']
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  ordersCompleted: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const sellerModel = mongoose.model('Seller', sellerSchema);

module.exports = sellerModel;