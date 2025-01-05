const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the student
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to the event
  amount: { type: Number, required: true }, // Optional, in case amount details are needed
  createdAt: { type: Date, default: Date.now }, // Timestamp for the transaction
});

module.exports = mongoose.model('Transaction', transactionSchema);
