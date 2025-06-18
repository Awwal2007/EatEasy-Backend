const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: { type: String, required: true, default: " "},
  assignedTo: { type: String, required: true },
  createdBy: { type: String, required: true },
  status: { type: String, enum: ['open', 'close'], default: 'open' },
  createdAt: { type: String, required: true},
}, { timestamps: true });

const ticketModel = mongoose.model('Ticket', ticketSchema);
module.exports = ticketModel