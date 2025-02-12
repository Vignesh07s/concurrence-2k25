const express = require('express');
const { getEventCount } = require('../controllers/countController');
const router = express.Router();

router.get('/:registrationId', getEventCount); // Use URL param

module.exports = router;
