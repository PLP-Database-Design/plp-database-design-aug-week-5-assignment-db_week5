# Database Interacation in Web Applications

This demonstrates the cconnection of MySQL database and Node.js to create a simple API

## Requirements
- [Node.js](https://nodejs.org/) installed
-  MySQL installed and running
-  A code editor, like [Visual Studio Code](https://code.visualstudio.com/download)

## Setup
1. Clone the repository
2. Initialize the node.js environment
   ```
   npm init -y
   ```
3. Install the necessary dependancies
   ```
   npm install express mysql2 dotenv nodemon
   ```
4. Create a ``` server.js ``` and ```.env``` files
5. Basic ```server.js``` setup
   <br>
   
   ```js
   const express = require('express')
   const app = express()

   
   // Question 1 goes here


   // Question 2 goes here


   // Question 3 goes here


   // Question 4 goes here

   

   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })
   ```
<br><br>

## Run the server
   ```
   nodemon server.js
   ```
<br><br>

## Setup the ```.env``` file
```.env
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

<br><br>

## Configure the database connection and test the connection
Configure the ```server.js``` file to access the credentials in the ```.env``` to use them in the database connection

<br>

## 1. Retrieve all patients
Create a ```GET``` endpoint that retrieves all patients and displays their:
- ```patient_id```
- ```first_name```
- ```last_name```
- ```date_of_birth```

<br>

## 2. Retrieve all providers
Create a ```GET``` endpoint that displays all providers with their:
- ```first_name```
- ```last_name```
- ```provider_specialty```

<br>

## 3. Filter patients by First Name
Create a ```GET``` endpoint that retrieves all patients by their first name

<br>

## 4. Retrieve all providers by their specialty
Create a ```GET``` endpoint that retrieves all providers by their specialty

<br>
JavaScript
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,   

  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
const   
 port = 3000;

// Endpoint to retrieve all patients
app.get('/patients', (req, res) => {
  pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to retrieve all providers
app.get('/providers', (req, res) => {
  pool.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to filter patients by first name
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to retrieve providers by specialty
app.get('/providers/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  pool.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);   

});

## NOTE: Do not fork this repository
