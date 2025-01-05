const express = require('express');
const { createEvent, getEvents, getEvent } = require('../controllers/eventController');

const router = express.Router();

// Create Event
router.post('/createEvent', createEvent);

// Get Events
router.get('/getEvents', getEvents);

// Get event by name
router.get('/getEvent/:eventName', getEvent);

module.exports = router;
