const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    rulesAndGuidelines: { type: [String], default: [] },
    rounds: { type: [String], default: [] },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    registrationFee: { type: Number, required: true },
    prizes: { type: String, required: true },
    maxParticipants: { type: Number, required: true },
    registrationCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    qrimage: { type: String, required: true },
    wlink : {type: String},
    coordinators: [{
        name: { type: String, required: true },
        contact: { type: String, required: true }
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('Event', eventSchema);