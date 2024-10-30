const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config

const app = express();

// Create connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to database
db.connect((err) => {
    if(err) {
        console.log('Error connecting to database');
    }
    console.log('Connected to database');
});


// 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// 3. Filter patients by First Name
app.get('/patients/first-name/:firstName', (req, res) => {
    const { firstName } = req.params;
    const sql = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(sql, [firstName], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const sql = 'SELECT * FROM providers WHERE provider_specialty = ?';
    db.query(sql, [specialty], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});