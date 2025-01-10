const Student = require('../models/Student');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const fs = require('fs');

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

        await student.save({ session }),
            await eventDoc.save({ session }),
            await transaction.save({ session }),

            await session.commitTransaction();



        const browser = await puppeteer.launch({ headless: true })
        // Generate PDFs concurrently
        let paymentReceipt, eventTicket;
        try {
            paymentReceipt = await generatePaymentReceipt(student, eventDoc, transaction, browser);
        } catch (error) {
            console.error('Error generating payment receipt:', error);
            throw new Error('Error generating payment receipt');
        }

        try {
            eventTicket = await generateEventTicket(student, eventDoc, ticketId, browser);
        } catch (error) {
            console.error('Error generating event ticket:', error);
            throw new Error('Error generating event ticket');
        }

        await browser.close();

        // Send email
        await sendConfirmationEmail(student, eventDoc, eventTicket, paymentReceipt);

        res.status(201).json({ message: 'Student registered successfully', student });

    } catch (error) {
        await session.abortTransaction();
        console.error('Error confirming registration:', error);
        res.status(500).json({ message: 'Error confirming registration', error });
    } finally {
        session.endSession();
    }
};



const generatePaymentReceipt = async (student, eventDoc, transaction, browser) => {
    // Format the date to remove the timezone
    const formattedDate = new Date(transaction.createdAt)
        .toString() // Converts to "Wed Jan 08 2025 14:53:59 GMT+0530 (India Standard Time)"
        .split('GMT')[0] // Removes "GMT+0530 (India Standard Time)"
        .trim(); // Removes trailing spaces

    const htmlContent = `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            .header img { max-width: 100%; height: auto; margin-bottom: 20px; }
            p { font-size: 14px; color: #555; }
            .details { margin-top: 20px; }
            .details span { font-weight: bold; }
            .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
            .table-container { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f4f4f4; font-weight: bold; }
        </style>
    </head>
    <body>
        <!-- Image at the top -->
        <div class="header">
            <img src="https://res.cloudinary.com/dvlqrld7w/image/upload/v1736397468/jswwej08j9aeua4lh4zf.jpg" alt="Event Header">
        </div>

        <h1>Payment Receipt</h1>

        <div class="table-container">
            <table>
                <tr>
                    <th>Name</th>
                    <td>${student.name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${student.email}</td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>${student.phoneNumber}</td>
                </tr>
                <tr>
                    <th>Registration ID</th>
                    <td>${student.registrationId}</td>
                </tr>
                <tr>
                    <th>Transaction ID</td>
                    <td>${transaction.transactionId}</td>
                </tr>
                <tr>
                    <th>Payment Date</th>
                    <td>${formattedDate}</td>
                </tr>
                <tr>
                    <th>Event Name</th>
                    <td>${eventDoc.eventName}</td>
                </tr>
            </table>
        </div>

        <p class="footer">Regards,<br>CONCURRENCE 2K25 Team</p>
    </body>
    </html>
    `;
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate the PDF as a buffer
    const pdfBuffer = await page.pdf({ format: "A4" });

    return pdfBuffer;
};


// Function to generate the event ticket (PDF as buffer)
const generateEventTicket = async (student, eventDoc, ticketId, browser) => {
    const htmlContent = `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            p { font-size: 14px; color: #555; }
            .details { margin-top: 20px; }
            .details span { font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>Event Ticket</h1>
        <p>Thank you for registering for <strong>${eventDoc.eventName}</strong>.</p>
        <div class="details">
            <p><span>Name:</span> ${student.name}</p>
            <p><span>Ticket ID:</span> ${ticketId}</p>
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Regards,<br>RIPPLE 2K25 Team</p>
    </body>
    </html>
    `;

    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    return pdfBuffer;
};

// Function to send confirmation email
const sendConfirmationEmail = async (student, eventDoc, eventTicket, paymentReceipt) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465, // Use 587 if 465 doesn't work
        secure: true, // true for port 465, false for port 587
        auth: {
            user: 'apikey', // This is the SendGrid username for SMTP
            pass: process.env.SENDGRID_API_KEY, // Use the API key as the password
        },
    });

    // Verify SMTP connection
    transporter.verify((error, success) => {
        if (error) {
            console.error('SMTP Connection Error:', error);
        } else {
            console.log('SMTP Server is ready to send emails');
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: student.email,
        subject: 'RIPPLE 2K25 Registration Confirmation',
        html: `
        <h1>Registration Successful!</h1>
        <p>Dear ${student.name},</p>
        <p>Thank you for registering for the event <strong>${eventDoc.eventName}</strong>.</p>
        <p>Your event ticket is attached below.</p>
        <p>Regards,<br>RIPPLE 2K25 Team</p>
        `,
        attachments: [
            {
                filename: `PaymentReceipt_${student.registrationId}.pdf`,
                content: paymentReceipt,
            },
            {
                filename: `Ticket_${eventDoc.eventName}_${student.registrationId}.pdf`,
                content: eventTicket,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { validateStudent, confirmRegistration };
