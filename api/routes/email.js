const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production')
  dotenv.config();

const pool = mysql.createPool
({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const router = express.Router();

router.post('/joinWaitList', async (req, res) => {

  const { email } = req.body;
  try 
  {
    const [rows] = await pool.query('INSERT INTO demo_waitlist (email) VALUES (?)', [
      email
    ]);

    res.json({message: "Success!"})
  }

  catch(error)
  {
    res.json({errorMessage: error});
  }
});

module.exports = router;
