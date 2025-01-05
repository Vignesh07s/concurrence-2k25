const express = require('express');
const { validateStudent, confirmRegistration } = require('../controllers/registrationController');

const router = express.Router();

// Validate Student
router.post('/validate', validateStudent);

// Confirm Registration
router.post('/confirm', confirmRegistration);

module.exports = router;