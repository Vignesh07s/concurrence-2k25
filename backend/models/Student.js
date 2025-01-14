const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationId: { type: String, required: true, unique: true },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/, // Ensures the phone number is a valid Indian mobile number
  },
  gender: { type: String, required: true },
  yearSem: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  events: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Event reference
      transactionId: { type: String, required: true }, // Transaction ID for this event
      ticketId: { type: String, required: true }, // Ticket ID for this event
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);