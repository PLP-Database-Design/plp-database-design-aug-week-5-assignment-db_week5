const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Retrieve all patients
app.get("/patients", (req, res) => {
  const sql =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Retrieve all providers
app.get("/providers", (req, res) => {
  const sql =
    "SELECT first_name, last_name, provider_speciality FROM providers";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Filter patients by first name
app.get("/patients/:firstName", (req, res) => {
  const firstName = req.params.firstName;
  const sql = "SELECT * FROM patients WHERE first_name = ?";
  db.query(sql, [firstName], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Retrieve all providers by specialty
app.get("/providers/speciality/:speciality", (req, res) => {
  const specialty = req.params.specialty;
  const sql = "SELECT * FROM providers WHERE provider_speciality = ?";
  db.query(sql, [specialty], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
