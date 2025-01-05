const Student = require('../models/Student');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const nodemailer = require("nodemailer");

// Validate if the student exists and is registered for the event
const validateStudent = async (req, res) => {
    const { name, email, registrationId, phoneNumber, yearSem, college, department, event } = req.body;

    try {
        // Step 1: Validate input
        if (!name || !email || !registrationId || !college || !department || !event) {
            return res.status(400).json({ message: 'All fields are required' });
        }



        // Step 2: Check if the event exists
        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        if (!eventDoc) {
            return res.status(404).json({ message: 'Event not found' });
        }


        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }

        const yearSemRegex = /^(I|II|III|IV)-(I|II)$/; // Format: Roman numerals (e.g., "III-I")
        if (!yearSemRegex.test(yearSem)) {
            return res.status(400).json({ message: 'Invalid year-semester format. Use "I-IV" for year and "I-II" for semester.' });
        }


        // Step 3: Check if the student exists
        let student = await Student.findOne({ registrationId });

        if (student) {
            // Step 3.1: If the student exists, check if they are already registered for the event
            const isAlreadyRegistered = student.events.some(
                (e) => e.eventId.toString() === eventDoc._id.toString()
            );

            if (isAlreadyRegistered) {
                return res.status(400).json({ message: 'Student already registered for this event' });
            }

            // Proceed to next step (payment process)
            return res.status(200).json({ message: 'Student can proceed to payment', student });
        } else {
            // Step 4.2: If the student does not exist, create and add the student to the collection
            student = new Student({
                name,
                email,
                registrationId,
                college,
                phoneNumber,
                yearSem,
                department,
                events: [],
            });

            // Save the student
            await student.save();

            // Proceed to next step (payment process)
            return res.status(200).json({ message: 'Student created and can proceed to payment', student });
        }

    } catch (error) {
        console.error('Error validating student:', error);
        res.status(500).json({ message: 'Error validating student', error });
    }
};


// Confirm registration and proceed with student registration
const confirmRegistration = async (req, res) => {
    const {
        registrationId,
        transactionId,
        event,
    } = req.body;

    try {
        // Validate input
        if (
            !registrationId ||
            !transactionId ||
            !event
        ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the event exists
        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        if (!eventDoc) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the transaction ID is duplicate
        const existingTransaction = await Transaction.findOne({ transactionId });
        if (existingTransaction) {
            return res.status(400).json({ message: 'Duplicate Transaction' });
        }

        // Check if the student exists
        let student = await Student.findOne({ registrationId });

        if (student) {

            // Register the student for the event
            student.events.push({ eventId: eventDoc._id, transactionId });
        }

        // Save the student
        await student.save();

        // Add the student to the event's participants
        eventDoc.participants.push(student._id);
        await eventDoc.save();

        // Record the transaction
        const transaction = new Transaction({
            transactionId,
            studentId: student._id,
            eventId: eventDoc._id,
            amount: 100, // Example amount, adjust as needed
        });
        await transaction.save();

        // Send confirmation email
        await sendConfirmationEmail(student.email, student.name, eventDoc.eventName);

        // Response
        res.status(201).json({ message: 'Student registered successfully', student });
    } catch (error) {
        console.error('Error confirming registration:', error);
        res.status(500).json({ message: 'Error confirming registration', error });
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
});

const sendConfirmationEmail = async (email, name, eventName) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "RIPPLE 2K25 Registration Confirmation",
      html: `
        <h1>Registration Successful!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering for the event <strong>${eventName}</strong>.</p>
        <p>We look forward to seeing you there!</p>
        <p>Regards,<br>RIPPLE 2K25 Team</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

module.exports = { validateStudent, confirmRegistration };
