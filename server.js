const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const onboardingRoutes = require('./Routes/onboardingRoutes');
const workoutRoutes = require('./Routes/workoutRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/workouts', workoutRoutes); 

// Error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});



// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
