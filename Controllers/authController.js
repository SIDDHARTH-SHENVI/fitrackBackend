const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../Models/userModel");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const userExists = await findUserByEmail(email);
  if (!userExists) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);

    const token = generateToken(user.id);

    res.status(201).json({ token, user });
  }
  return res.status(400).json({ message: "User already exists" });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email from request:", email);

  const user = await findUserByEmail(email);

  console.log("User found:", user);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id);
    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { signup, signin };
