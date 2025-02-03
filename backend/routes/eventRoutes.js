const express = require('express');
const { createEvent, getEvents, getEvent, getAllEventRegistrationCounts, getParticipants } = require('../controllers/eventController');

const router = express.Router();

// Create Event
router.post('/createEvent', createEvent);

// Get Events
router.get('/', getEvents);

//registrationCount
router.get('/participantsCount', getAllEventRegistrationCounts);

//participants
router.get('/:eventName/participants', getParticipants);

// Get event by name
router.get('/:eventName', getEvent);


module.exports = router;