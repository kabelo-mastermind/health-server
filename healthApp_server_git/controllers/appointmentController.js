// controllers/appointmentController.js
const db = require('../config/db');

// Get all appointments
const getAppointments = (req, res) => {
  const sql = "SELECT id, user_id, name, email, reason, created_at, preferred_datetime FROM patient_appointments";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(result);
  });
};

// Insert a new appointment
const insertAppointment = (req, res) => {
  const { user_id, name, email, preferred_datetime, reason } = req.body;

  const sql = "INSERT INTO patient_appointments (user_id, name, email, preferred_datetime, reason) VALUES (?, ?, ?, ?, ?)";
  const values = [user_id, name, email, preferred_datetime, reason];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting appointment:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Appointment request submitted successfully!" });
  });
};

// Get dashboard appointments
const getDashboardAppointment = (req, res) => {
  const sql = "SELECT id, name, email, reason, created_at, preferred_datetime FROM patient_appointments";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(result);
  });
};

module.exports = { getAppointments, insertAppointment, getDashboardAppointment };
