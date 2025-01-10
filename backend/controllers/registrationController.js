const Student = require('../models/Student');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Validate if the student exists and is registered for the event
const validateStudent = async (req, res) => {
    const { name, email, registrationId, phoneNumber, yearSem, college, department, event, gender } = req.body;
    try {
        // Step 1: Validate input
        if (!name || !email || !registrationId || !college || !department || !event || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Step 2: Check if the event exists
        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        if (!eventDoc) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Validate phone number and year-sem format
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                message: 'Invalid phone number format',
                errorCode: 'INVALID_PHONE'
            });
        }

        const yearSemRegex = /^(I|II|III|IV)-(I|II)$/; // Format: Roman numerals (e.g., "III-I")
        if (!yearSemRegex.test(yearSem)) {
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
                return res.status(400).json({ message: 'Student already registered for this event' });
            }

            // Proceed to payment process
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
            return res.status(200).json({ message: 'Student created and can proceed to payment', student });
        }
    } catch (error) {
        console.error('Error validating student:', error);
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

        // Send email to the student
        const emailSubject = `Registration Confirmation for ${eventDoc.eventName}`;
        const emailText = `Dear ${student.name},\n\nYou have successfully registered for the ${eventDoc.eventName}. Your ticket ID is: ${ticketId}.\n\nThank you for registering!\n\nBest regards,\nThe Event Team`;

        // Send the email
        await sendEmail(student.email, emailSubject, emailText);


        res.status(201).json({ message: 'Student registered successfully', student });

    } catch (error) {
        await session.abortTransaction();
        console.error('Error confirming registration:', error);
        res.status(500).json({ message: 'Error confirming registration', error });
    } finally {
        session.endSession();
    }
};

// Configure SendGrid API Key
 // Replace with your actual API key

// Send email function using SendGrid
const sendEmail = async (to, subject, text) => {
    const msg = {
        to: to,
        from: process.env.EMAIL,
        subject: subject,
        text: text,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};





module.exports = { validateStudent, confirmRegistration };
