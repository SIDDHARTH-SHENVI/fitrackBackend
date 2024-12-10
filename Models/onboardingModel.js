const db = require('../Config/db');

// Save onboarding details to the database
const saveOnboardingDetails = async (
  userId,
  gender,
  age,
  height,
  weight,
  goal,
  physicalActivityLevel,
  sleepQuality,
  daysPerWeek,
  workLocation,
  dietaryPreference
) => {
  const query = `
    INSERT INTO onboarding_details 
    (user_id, gender, age, height, weight, goal, physical_activity_level, sleep_quality, days_per_week, work_location, dietary_preference) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *;
  `;

  const values = [
    userId,
    gender,
    age,
    height,
    weight,
    goal,
    physicalActivityLevel,
    sleepQuality,
    daysPerWeek,
    workLocation,
    dietaryPreference,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = { saveOnboardingDetails };
