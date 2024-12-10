const express = require('express');
const router = express.Router();
const workoutController = require('../Controllers/workoutController');

// Routes
router.get('/predefined', workoutController.getPredefinedWorkouts); // Fetch predefined workouts


module.exports = router;