const express = require('express');
const { createEvent, getEvents, getEvent, getAllEventRegistrationCounts, getParticipants } = require('../controllers/eventController');

const router = express.Router();

// Create Event
router.post('/createEvent', createEvent);

// Get Events
router.get('/', getEvents);

// Get event by name
router.get('/:eventName', getEvent);

//participants-count
router.get('/participants-count', getAllEventRegistrationCounts);

//participants
router.get('/:eventName/participants', getParticipants);

module.exports = router;
