const express = require('express');
const { createEvent, getEvents, getEvent, getAllEventRegistrationCounts } = require('../controllers/eventController');

const router = express.Router();

// Create Event
router.post('/createEvent', createEvent);

// Get Events
router.get('/', getEvents);

// Get event by name
router.get('/:eventName', getEvent);

//registrationCount
router.get('/participants-count', getAllEventRegistrationCounts);

module.exports = router;
