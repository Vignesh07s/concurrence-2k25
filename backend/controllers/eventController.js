const Event = require('../models/Event');
const moment = require('moment');

const createEvent = async (req, res) => {
    const {
        eventName,
        description,
        rulesAndGuidelines,
        rounds,
        date,
        startTime,
        endTime,
        location,
        registrationFee,
        prizes,
        maxParticipants,
        coordinators,
        image,
        qrimage
    } = req.body;

    try {
        // Basic validation for required fields
        if (
            !eventName ||
            !description ||
            !rulesAndGuidelines ||
            !rounds ||
            !date ||
            !startTime ||
            !endTime ||
            !location ||
            !registrationFee ||
            !prizes ||
            !maxParticipants ||
            !coordinators ||
            !image ||
            !qrimage
        ) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Check for duplicate events
        const existingEvent = await Event.findOne({ eventName });
        if (existingEvent) {
            return res.status(400).json({ message: `An event with the name "${eventName}" already exists.` });
        }

        // Validate date format (DD-MM-YYYY)
        const isValidDate = moment(date, "DD-MM-YYYY", true).isValid();
        if (!isValidDate) {
            return res.status(400).json({ message: 'Date must be in the format DD-MM-YYYY.' });
        }

        // Convert the string date into a valid Date object
        const eventDate = moment(date, "DD-MM-YYYY").toDate();  // Use `eventDate` instead of `date`

        // Validate time format (HH:mm)
        const isValidStartTime = moment(startTime, "HH:mm", true).isValid();
        const isValidEndTime = moment(endTime, "HH:mm", true).isValid();
        if (!isValidStartTime || !isValidEndTime) {
            return res.status(400).json({ message: 'Start time and end time must be in the format HH:mm.' });
        }

        // Validate coordinators
        for (const coordinator of coordinators) {
            if (!coordinator.name || !coordinator.contact) {
                return res.status(400).json({ message: 'Each coordinator must have a name and contact.' });
            }
        }

        // Validate rulesAndGuidelines
        if (rulesAndGuidelines && (!Array.isArray(rulesAndGuidelines) || rulesAndGuidelines.some(rule => typeof rule !== 'string'))) {
            return res.status(400).json({ message: 'Rules and guidelines must be an array of strings.' });
        }

        // Validate rounds
        if (rounds && (!Array.isArray(rounds) || rounds.some(round => typeof round !== 'string'))) {
            return res.status(400).json({ message: 'Rounds must be an array of strings.' });
        }

        // Create and save event
        const newEvent = new Event({
            eventName,
            description,
            rulesAndGuidelines: rulesAndGuidelines || [],
            rounds: rounds || [],
            date: eventDate, 
            startTime,
            endTime,
            location,
            registrationFee,
            prizes,
            maxParticipants,
            image,
            qrimage,
            coordinators,
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error });
    }
};


const getEvents = async (req, res) => {
    try {
        // Fetch all events, only selecting the required fields
        const events = await Event.find({}, 'eventName date startTime endTime location image');
        
        if (!events.length) {
            return res.status(404).json({ message: 'No events found.' });
        }

        // Send the fetched events as a response
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events', error });
    }
};


const getEvent = async (req, res) => {
    const { eventName } = req.params;
    try {
        // Find the event by eventName and populate all fields
        const event = await Event.findOne({ eventName });  // Use findOne here

        // If event is not found, return a 404 error
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Send the fetched event details as a response
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event details:', error);
        res.status(500).json({ message: 'Error fetching event details', error });
    }
};

const registrationCount = async (req, res) => {
    const { eventName } = req.params;
    try {
        // Use MongoDB aggregation to get the registration count
        const event = await Event.aggregate([
            { $match: { eventName } },
            { $project: { registrationCount: { $size: "$participants" } } },
        ]);

        // If the event is not found, return a 404 error
        if (!event.length) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Send only the registration count
        res.status(200).json({ registrationCount: event[0].registrationCount });
    } catch (error) {
        console.error('Error fetching registration count:', error);
        res.status(500).json({ message: 'Error fetching registration count', error });
    }
};





module.exports = { createEvent, getEvents, getEvent, registrationCount };