const db = require('../Config/db');

const saveOnboardingDetails = async (req, res) => {
  const { gender, age, height, weight, goal, physicalActivityLevel, sleepQuality, daysPerWeek, workLocation, dietaryPreference } = req.body;
  const userId = req.userId; // Extracted from the JWT token

  try {
    await db.query(
      'INSERT INTO onboarding_details (user_id, gender, age, height, weight, goal, physical_activity_level, sleep_quality, days_per_week, work_location, dietary_preference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [userId, gender, age, height, weight, goal, physicalActivityLevel, sleepQuality, daysPerWeek, workLocation, dietaryPreference]
    );

    res.status(201).json({ message: 'Onboarding details saved successfully' });
  } catch (error) {
    console.error('Error saving onboarding details:', error);
    res.status(500).json({ message: 'Failed to save onboarding details' });
  }
};

module.exports = { saveOnboardingDetails };
