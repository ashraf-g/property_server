const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newUser = new User({
    username,
    email,
    password,
    role,
  });

  User.signup(newUser, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: "User created successfully" });
  });
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  User.login(email, password, role, (err, user) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  });
};
