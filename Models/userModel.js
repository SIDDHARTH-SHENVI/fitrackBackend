const db = require("../Config/db");

const findUserByEmail = async (email) => {
  try {
    console.log("Querying for email:", email); // Log the email passed to the function

    // Execute the query and log the result
    const result = await db.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    console.log("Query result:", result.rows); // Log only the rows for clarity

    // Check if a user was found and return the first row or null
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      console.log("No user found with email:", email);
      return null;
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error querying for user by email:", email, error.message);

    // Re-throw the error or return a structured error response
    throw new Error(
      "Failed to retrieve user by email. Please try again later."
    );
  }
};

const createUser = async (name, email, password) => {
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    console.log("User created:", result.rows[0]); // Log the created user
    return result.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Error creating user");
  }
};

module.exports = {
  findUserByEmail,
  createUser,
};
