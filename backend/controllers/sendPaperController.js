const sgMail = require("@sendgrid/mail");
const fs = require("fs");

// Set up SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Controller: Handle paper submission
const sendPaper = async (req, res) => {

  const { name, email, phoneNumber, registrationNumber } = req.body;

  // Validate fields
  if (!name || !email || !phoneNumber || !registrationNumber || !req.file) {
    
    return res.status(400).json({ message: "All fields are required!" });
  }

  

  try {
    // Construct email message
    const msg = {
      to: ["kanikecharan23@gmail.com", "abhignamadisetty@gmail.com"],
      from: process.env.EMAIL,
      subject: `Paper Submission from ${name}`,
      html: `
        <h1>Paper Submission Details</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Registration ID:</strong> ${registrationNumber}</p>
        <p>Find the paper attached below.</p>
      `,
      attachments: [
        {
          content: fs.readFileSync(req.file.path).toString("base64"),
          filename: req.file.originalname,
          type: req.file.mimetype,
          disposition: "attachment",
        },
      ],
    };

    // Send email using SendGrid
    await sgMail.send(msg);
    // Delete the uploaded file after sending
    fs.unlinkSync(req.file.path);

    return res.status(200).json({ message: "Paper submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send paper", error });
  }
};

module.exports = {
  sendPaper, // Export only the sendPaper controller
};
