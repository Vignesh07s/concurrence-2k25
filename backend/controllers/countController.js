const Student = require('../models/Student');

const getEventCount = async (req, res) => {
    try {
        let { registrationId } = req.params;
        if (!registrationId) {
            return res.status(400).json({ error: "Registration ID is required" });
        }

        //convery registrationId to uppercase
        registrationId = registrationId.toUpperCase();

        // Find student with their registered events populated
        const student = await Student.findOne({ registrationId }).populate('events.eventId', 'eventName');

        // If student not found or no registered events, return empty response
        if (!student || student.events.length === 0) {
            return res.status(200).json({ regNumber: registrationId, eventCount: 0, eventNames: [] });
        }

        // Extract event names
        const eventNames = student.events.map(event => event.eventId.eventName);

        res.status(200).json({ regNumber: registrationId, eventCount: eventNames.length, eventNames });
    } catch (error) {
        console.error('Error fetching event details:', error.message);
        res.status(500).json({ error: 'Failed to fetch event details' });
    }
};

module.exports = { getEventCount };
