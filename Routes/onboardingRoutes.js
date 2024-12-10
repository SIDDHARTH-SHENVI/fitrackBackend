const express = require('express');
const { saveOnboardingDetails } = require('../Controllers/onboardingController');
const protect = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, saveOnboardingDetails);

module.exports = router;
