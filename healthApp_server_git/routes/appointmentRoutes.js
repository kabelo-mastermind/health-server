// routes/appointmentRoutes.js
const express = require('express');
const { getAppointments, insertAppointment, getDashboardAppointment } = require('../controllers/appointmentController');

const router = express.Router();

// Route to get all appointments (for admin or specific use)
router.get('/patient_appointments', getAppointments);

// Route to insert a new appointment
router.post('/appointments', insertAppointment);

// Route to get dashboard appointments (could be the same as getAppointments depending on the use case)
router.get('/dashboard_appointments', getDashboardAppointment);

module.exports = router;
