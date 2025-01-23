const mongoose = require('mongoose');



const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  amount: { type: Number, required: true },
  paymentScreenshotUrl: { type: String, required: true },
  createdAt: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);