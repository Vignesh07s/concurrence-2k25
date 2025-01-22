const express = require('express');
const { validateStudent, confirmRegistration } = require('../controllers/registrationController');
const { sendPaper } = require('../controllers/sendPaperController'); // Only import sendPaper

// Import the multer upload middleware from a separate file
const { upload } = require('../middlewares/uploadMiddleware'); // Ensure this is imported correctly

const router = express.Router();

// Validate Student
router.post('/validate', validateStudent);

// Confirm Registration
router.post('/confirm', confirmRegistration);

// Submit Paper
router.post('/submitPaper', upload.single('paperFile'), sendPaper); // Apply upload middleware here

module.exports = router;
