const db = require('../Config/db'); // Database connection file (e.g., using Sequelize, Knex, or a raw MySQL client)

// Fetch predefined workouts
exports.getPredefinedWorkouts = async (req, res) => {
    try {
        const plans = await db.query(
            `SELECT p.predefined_plan_id, p.plan_name, 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'exercise_id', e.predefined_exercise_id,
                            'exercise_name', e.exercise_name
                        )
                    ) AS exercises
             FROM predefined_plans p
             LEFT JOIN predefined_exercises e ON p.predefined_plan_id = e.predefined_plan_id
             GROUP BY p.predefined_plan_id`
        );
        res.status(200).json(plans[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch predefined workouts' });
    }
};