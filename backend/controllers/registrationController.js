const Student = require('../models/Student');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const fs = require('fs');
const winston = require('winston');

// Set up winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Validate if the student exists and is registered for the event
const validateStudent = async (req, res) => {
    const { name, email, registrationId, phoneNumber, yearSem, college, department, event, gender } = req.body;
    try {
        // Step 1: Validate input
        if (!name || !email || !registrationId || !college || !department || !event || !gender) {
            logger.error('Validation failed: Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Step 2: Check if the event exists
        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        if (!eventDoc) {
            logger.error('Event not found');
            return res.status(404).json({ message: 'Event not found' });
        }

        // Validate phone number and year-sem format
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
        if (!phoneRegex.test(phoneNumber)) {
            logger.error('Invalid phone number format');
            return res.status(400).json({
                message: 'Invalid phone number format',
                errorCode: 'INVALID_PHONE'
            });
        }

        const yearSemRegex = /^(I|II|III|IV)-(I|II)$/; // Format: Roman numerals (e.g., "III-I")
        if (!yearSemRegex.test(yearSem)) {
            logger.error('Invalid year-semester format');
            return res.status(400).json({ message: 'Invalid year-semester format. Use "I-IV" for year and "I-II" for semester.' });
        }

        // Step 3: Check if the student exists
        let student = await Student.findOne({ registrationId });

        if (student) {
            // Check if the student is already registered for the event
            const isAlreadyRegistered = student.events.some(
                (e) => e.eventId.toString() === eventDoc._id.toString()
            );

            if (isAlreadyRegistered) {
                logger.info(`Student ${registrationId} is already registered for the event ${event}`);
                return res.status(400).json({ message: 'Student already registered for this event' });
            }

            // Proceed to payment process
            logger.info(`Student ${registrationId} validated successfully for event ${event}`);
            return res.status(200).json({ message: 'Student can proceed to payment', student });
        } else {
            // Create and add the student to the collection
            student = new Student({
                name,
                email,
                gender,
                registrationId,
                college,
                phoneNumber,
                yearSem,
                department,
                events: [],
            });

            await student.save();

            // Proceed to payment process
            logger.info(`Student ${registrationId} created and can proceed to payment`);
            return res.status(200).json({ message: 'Student created and can proceed to payment', student });
        }
    } catch (error) {
        logger.error(`Error validating student: ${error.message}`);
        res.status(500).json({ message: 'Error validating student', error });
    }
};

// Confirm registration and proceed with student registration
const confirmRegistration = async (req, res) => {
    const { registrationId, transactionId, event } = req.body;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // Validate input and fetch event/student
        if (!registrationId || !transactionId || !event) {
            logger.error('Missing required fields for confirmation');
            return res.status(400).json({ message: 'All fields are required' });
        }

        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        const existingTransaction = await Transaction.findOne({ transactionId });
        const student = await Student.findOne({ registrationId });

        if (!eventDoc) throw new Error('Event not found');
        if (existingTransaction) throw new Error('Duplicate Transaction');
        if (!student) throw new Error('Student not found');

        // Update student, event, and save transaction
        const ticketId = `${eventDoc.eventName.slice(0, 3).toUpperCase()}-${student.registrationId.slice(0, 2)}`;
        student.events.push({ eventId: eventDoc._id, transactionId, ticketId });
        eventDoc.participants.push(student._id);
        eventDoc.registrationCount += 1;
        const transaction = new Transaction({ transactionId, studentId: student._id, eventId: eventDoc._id, amount: eventDoc.registrationFee });

        await student.save({ session });
        await eventDoc.save({ session });
        await transaction.save({ session });

        await session.commitTransaction();

        logger.info(`Student ${registrationId} successfully registered for event ${event}`);
        res.status(201).json({ message: 'Student registered successfully', student });

        const browser = await puppeteer.launch({ headless: true });

        let paymentReceipt, eventTicket;
        try {
            paymentReceipt = await generatePaymentReceipt(student, eventDoc, transaction, browser);
        } catch (error) {
            logger.error('Error generating payment receipt');
            throw new Error('Error generating payment receipt');
        }

        try {
            eventTicket = await generateEventTicket(student, eventDoc, ticketId, browser);
        } catch (error) {
            logger.error('Error generating event ticket');
            throw new Error('Error generating event ticket');
        }

        await browser.close();

        // Send email
        await sendConfirmationEmail(student, eventDoc, eventTicket, paymentReceipt);

    } catch (error) {
        await session.abortTransaction();
        logger.error(`Error confirming registration: ${error.message}`);
        res.status(500).json({ message: 'Error confirming registration', error });
    } finally {
        session.endSession();
    }
};

// Other functions like generatePaymentReceipt, generateEventTicket, and sendConfirmationEmail remain unchanged...

module.exports = { validateStudent, confirmRegistration };
