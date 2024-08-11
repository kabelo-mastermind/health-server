// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  secret: 'secrete',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/api', appointmentRoutes);
app.use('/', userRoutes);

module.exports = app;
