// controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Sign up new user
const signup = (req, res) => {
  const { name, email, password, role } = req.body;

  const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
  const insertUserQuery = "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)";

  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error("Error during signup:", err);
      return res.status(500).json({ error: "An error occurred during signup" });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: "Email already exists. Please use a different email address." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(insertUserQuery, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ error: "An error occurred during signup" });
      }
      return res.status(200).json({ message: "Signup successful" });
    });
  });
};

// Log in user
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT id, role, username, email, password_hash FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length > 0 && bcrypt.compareSync(password, result[0].password_hash)) {
      req.session.username = result[0].username;
      req.session.userId = result[0].id;
      req.session.role = result[0].role;
      req.session.email = result[0].email;

      return res.json({ login: true, message: "Login successful" });
    } else {
      return res.status(401).json({ login: false, message: "Invalid email or password" });
    }
  });
};

// Log out user
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out successfully" });
  });
};

// Get user data
const getUser = (req, res) => {
  if (req.session.userId && req.session.role && req.session.username && req.session.email) {
    return res.json({
      valid: true,
      userId: req.session.userId,
      role: req.session.role,
      username: req.session.username,
      email: req.session.email
    });
  } else {
    return res.json({ valid: false });
  }
};
// get dashboard users
const getUsers = (req, res) => {
    const sql = "SELECT id, username, email, created_at FROM users";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json(result);
    });
  };

module.exports = { signup, login, logout, getUser, getUsers };
