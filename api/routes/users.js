const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { verifyWebhook } = require('@clerk/express/webhooks');

if(process.env.NODE_ENV !== 'production')
  dotenv.config();

const pool = mysql.createPool
({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

router.post('/createUser', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const evt = await verifyWebhook(req)

    const userid = evt.data.id;

    const [rows] = await pool.query('INSERT INTO users (userid) VALUES (?)', [
      userid,
      ]);
    
    const { id } = evt.data
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    return res.send('Webhook received');
    
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return res.status(400).send('Error verifying webhook')
  }
});

module.exports = router;
