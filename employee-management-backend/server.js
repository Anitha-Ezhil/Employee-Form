const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'database_name'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

app.post('/api/employees', (req, res) => {
    const { employee_id, name, department, date_of_joining, email } = req.body;
    const INSERT_EMPLOYEE_QUERY = `INSERT INTO employees (employee_id, name, department, date_of_joining, email) VALUES (?, ?, ?, ?, ?)`;
    console.log('SQL Query:', INSERT_EMPLOYEE_QUERY); // Log the SQL query
    console.log('Request Body:', req.body); // Log the request body
    db.query(INSERT_EMPLOYEE_QUERY, [employee_id, name, department, date_of_joining, email], (err, result) => {
        if (err) {
            console.error('Error inserting employee:', err);
            res.status(500).send({ message: 'Error inserting employee' });
        } else {
            console.log('Employee inserted successfully');
            res.status(200).send({ message: 'Employee inserted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
