require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can also use other services like 'hotmail', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL,  // Replace with your email address
        pass: process.env.EMAIL_PASSWORD    // Replace with your email password
    }
});

// Define the email options
const mailOptions = {
    from: process.env.EMAIL,  // Replace with your email address
    to: 'vigneshwarareddys@gmail.com',  // Replace with recipient's email address
    subject: 'Test Email from Node.js',
    text: 'This is a simple test email sent from Node.js using Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
