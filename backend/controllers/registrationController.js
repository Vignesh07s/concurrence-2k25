const Student = require('../models/Student');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const pdf = require('html-pdf-node');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');

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
    const { registrationId, transactionId, event, paymentScreenshotUrl } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // Validate input and fetch event/student
        if (!registrationId || !transactionId || !event || !paymentScreenshotUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const eventDoc = await Event.findOne({ eventName: { $regex: new RegExp(`^${event}$`, 'i') } });
        const existingTransaction = await Transaction.findOne({ transactionId });
        const student = await Student.findOne({ registrationId });

        if (!eventDoc) throw new Error('Event not found');
        if (existingTransaction) {
            return res.status(400).json({ error: "Duplicate Transaction ID" });
        }
        if (!student) throw new Error('Student not found');

        const formattedDate = new Intl.DateTimeFormat('en-IN', {
            weekday: 'long', // Full weekday name
            day: '2-digit',  // Day with 2 digits
            month: 'long',   // Full month name
            year: 'numeric', // Full year
            hour: '2-digit', // Hour with 2 digits
            minute: '2-digit', // Minute with 2 digits
            second: '2-digit', // Second with 2 digits
            hour12: true,     // AM/PM
            timeZone: 'Asia/Kolkata',  // IST timezone
        }).format(new Date());

        // Update student, event, and save transaction
        const eventPrefix = eventDoc.eventName.toUpperCase().slice(0, 3);
        const paddedCount = String(eventDoc.registrationCount + 1).padStart(3, '0'); // Zero-padding
        const ticketId = `${eventPrefix}-${paddedCount}`; // Optional: Add a random string here
        student.events.push({ eventId: eventDoc._id, transactionId, ticketId });
        eventDoc.participants.push(student._id);
        eventDoc.registrationCount += 1;
        const transaction = new Transaction({
            transactionId,
            studentId: student._id,
            eventId: eventDoc._id,
            amount: eventDoc.registrationFee,
            paymentScreenshotUrl,
            createdAt: formattedDate,
        });

        await student.save({ session });
        await eventDoc.save({ session });
        await transaction.save({ session });

        await session.commitTransaction();
        res.status(201).json({ message: 'Student registered successfully', student });

        const paymentReceipt = await generatePaymentReceipt(student, eventDoc, transaction);

        const eventTicket = await generateEventTicket(student, eventDoc, ticketId);

        await sendEmail(student, eventDoc, paymentReceipt, eventTicket, ticketId);
    } catch (error) {
        await session.abortTransaction();
        console.error('Error confirming registration:', error);
        res.status(500).json({ message: 'Error confirming registration', error });
    } finally {
        session.endSession();
    }
};

// Function to generate the payment receipt
const generatePaymentReceipt = async (student, eventDoc, transaction) => {

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
                    <td>${transaction.createdAt}</td>
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
    const options = { format: 'A4' };
    const file = { content: htmlContent };
    const pdfBuffer = await pdf.generatePdf(file, options);
    return pdfBuffer;
};


// Function to generate the event ticket
const generateEventTicket = async (student, eventDoc, ticketId) => {
    const qrCodeData = {
        ticketId: ticketId,
        attendeeName: student.name,
        eventName: eventDoc.eventName,
    };

    try {
        const eventDateUTC = new Date(eventDoc.date); // MongoDB date in UTC
        const formattedDate = eventDateUTC.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        // Generate QR code as a Base64 string
        const qrCodeBase64 = await qrcode.toDataURL(JSON.stringify(qrCodeData));

        // HTML content with proper alignment and provided images
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
                .qr-code { text-align: center; margin-top: 20px; }
            </style>
            </head>
            <body>
            <!-- Image at the top -->
            <div class="header">
                <img src="https://res.cloudinary.com/dvlqrld7w/image/upload/v1736397468/jswwej08j9aeua4lh4zf.jpg" alt="Event Header">
            </div>

            <h1>Event Ticket - ${eventDoc.eventName}</h1>

            <div class="table-container">
                <table>
                <tr>
                    <th>Name</th>
                    <td>${student.name}</td>
                </tr>
                <tr>
                    <th>Registration ID</th>
                    <td>${student.registrationId}</td>
                </tr>
                <tr>
                    <th>Ticket ID</th>
                    <td>${ticketId}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>${formattedDate}</td>
                </tr>
                <tr>
                    <th>Time</th>
                    <td>${eventDoc.startTime} - ${eventDoc.endTime}</td>
                </tr>
                <tr>
                    <th>Venue</th>
                    <td>${eventDoc.location}</td>
                </tr>
                </table>
            </div>
            <div class="qr-code">
                <img src="${qrCodeBase64}" alt="QR Code">
            </div>

            <p class="footer">Regards,<br>CONCURRENCE 2K25 Team</p>
            </body>
            </html>
        `;

        const options = { format: 'A4' };
        const file = { content: htmlContent };
        const pdfBuffer = await pdf.generatePdf(file, options);
        return pdfBuffer;
    } catch (error) {
        console.error('Error generating event ticket:', error);
        throw error;
    }
};



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Your Gmail email address
        pass: process.env.EMAIL_PASSWORD,  // Your Gmail password or App Password if 2FA is enabled
    },
});

const sendEmail = async (student, event, paymentReceipt, eventTicket, ticketId) => {
    const receiptPath = path.join(__dirname, `PaymentReceipt_${student.registrationId}.pdf`);
    const ticketPath = path.join(__dirname, `EventTicket_${student.registrationId}.pdf`);
    try {
        await fs.promises.writeFile(receiptPath, paymentReceipt);
        await fs.promises.writeFile(ticketPath, eventTicket);
        const mailOptions = {
            to: student.email,
            from: process.env.EMAIL,
            subject: 'CONCURRENCE 2K25 Registration Confirmation',
            html: `
            <h1>Registration Successful for ${event.eventName}!</h1>
            <p>Dear ${student.name},</p>
            <p>We're thrilled to confirm your registration for the upcoming event, <strong>${event.eventName}</strong>!</p>
            <p>Your unique ticket ID for this event is <strong>${ticketId}</strong>. Please retain this ID for future reference.</p>
            <p>Attached to this email, you'll find a copy of your payment receipt and event ticket. The payment receipt acknowledges your successful payment of ₹${event.registrationFee} for the event registration.</p>
            <p>Join the WhatsApp group for updates: <a href="${event.wlink}">Click here</a></p>
            <p>We look forward to seeing you at the event! Don't hesitate to reach out to us if you have any questions.</p>
            <p>Regards,<br>The CONCURRENCE 2K25 Team</p>
        `,
            attachments: [
                {
                    filename: `PaymentReceipt_${student.registrationId}.pdf`,
                    path: receiptPath,
                    contentType: 'application/pdf',
                },
                {
                    filename: `EventTicket_${student.registrationId}.pdf`,
                    path: ticketPath,
                    contentType: 'application/pdf',
                }
            ],
        };
        // Send email with Nodemailer
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    } finally {
        if (fs.existsSync(receiptPath)) await fs.promises.unlink(receiptPath);
        if (fs.existsSync(ticketPath)) await fs.promises.unlink(ticketPath);
    }
};


module.exports = { validateStudent, confirmRegistration };