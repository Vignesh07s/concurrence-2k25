const nodemailer = require("nodemailer");
const { PDFDocument, rgb } = require("pdf-lib");
const QRCode = require("qrcode");

async function generatePaymentReceipt(studentDetails) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 600]);

  page.drawText("Payment Receipt", {
    x: 50,
    y: 570,
    size: 20,
    color: rgb(0, 0.2, 0.7),
  });

  page.drawText(`Transaction ID: ${studentDetails["Transaction ID"]}`, {
    x: 50,
    y: 520,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Name: ${studentDetails.Name}`, {
    x: 50,
    y: 490,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Amount Paid: ${studentDetails.Amount}`, {
    x: 50,
    y: 460,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Payment Date: ${studentDetails.PaymentDate}`, {
    x: 50,
    y: 430,
    size: 16,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Return PDF buffer instead of saving to disk
}

async function generateEventTicket(studentDetails) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 600]);

  page.drawText("RIPPLE 2K25 - Event Ticket", {
    x: 50,
    y: 570,
    size: 20,
    color: rgb(0, 0.2, 0.7),
  });

  page.drawText(`Event: ${studentDetails.Event}`, {
    x: 50,
    y: 520,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Name: ${studentDetails.Name}`, {
    x: 50,
    y: 490,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Reg ID: ${studentDetails["Registration ID"]}`, {
    x: 50,
    y: 460,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Transaction ID: ${studentDetails["Transaction ID"]}`, {
    x: 50,
    y: 430,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Event Date: ${studentDetails["Event Date"]}`, {
    x: 50,
    y: 400,
    size: 16,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Venue: ${studentDetails.Venue}`, {
    x: 50,
    y: 370,
    size: 16,
    color: rgb(0, 0, 0),
  });

  // Generate QR Code
  const qrCodeData = `${studentDetails.Name} - ${studentDetails.Event} - ${studentDetails["Transaction ID"]}`;
  const qrCodeImage = await QRCode.toDataURL(qrCodeData);
  const qrImageBytes = qrCodeImage.split(',')[1];
  const qrImage = await pdfDoc.embedPng(Buffer.from(qrImageBytes, 'base64'));
  page.drawImage(qrImage, { x: 200, y: 200, width: 100, height: 100 });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Return PDF buffer instead of saving to disk
}

async function sendReceiptAndTicket(studentEmail) {
  // Static student details
  const studentDetails = {
    Name: "John Doe",
    "Registration ID": "CSE202501",
    Event: "Coding Contest",
    "Transaction ID": "TX12345",
    "Event Date": "March 10, 2025",
    Venue: "RGMCET Auditorium",
    Amount: "1000 INR", // Amount for payment receipt
    PaymentDate: "January 5, 2025",
  };

  // Generate both PDFs as in-memory buffers
  const paymentReceiptPdf = await generatePaymentReceipt(studentDetails);
  const eventTicketPdf = await generateEventTicket(studentDetails);

  // Send Email with Both Payment Receipt and Event Ticket
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vigneshwarareddys@gmail.com",
      pass: "ournzauthfzkankd",
    },
  });

  const mailOptions = {
    from: "vigneshwarareddys@gmail.com",
    to: studentEmail,
    subject: "Your Payment Receipt and Event Ticket - RIPPLE 2K25",
    html: `
      <h2>Thank you for registering for RIPPLE 2K25!</h2>
      <p>Please find below your payment receipt and event ticket for your reference:</p>
      <ul>
        <li><strong>Payment Receipt</strong> - This serves as proof of payment.</li>
        <li><strong>Event Ticket</strong> - This confirms your registration for the event.</li>
      </ul>
      <p>We look forward to your participation in the event!</p>
    `,
    attachments: [
      {
        filename: "payment_receipt.pdf",
        content: paymentReceiptPdf, // Attach the buffer directly
      },
      {
        filename: "event_ticket.pdf",
        content: eventTicketPdf, // Attach the buffer directly
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
}

// Call the function with student email
sendReceiptAndTicket("vigneshwarareddy4@gmail.com").catch((err) => console.error("Error:", err));
