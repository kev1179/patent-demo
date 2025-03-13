const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool
({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

pool.getConnection((err, con) =>
  {
    if (err instanceof Error) {
      console.log('pool.getConnection error:', err);
      return;
    }
  });

async function generateUniqueUserId() {
    let userId;
    let isUnique = false;

    while (!isUnique) {
        userId = Math.floor(10_000_000_000_000_0 + Math.random() * 9_000_000_000_000_000);
        const [rows] = await pool.query('SELECT userid FROM users WHERE userid = ?', [userId]);

        if (rows.length === 0) {
            isUnique = true;
        }
    }

    return userId;
}

const router = express.Router();

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if(rows.length == 0)
      return cb(null, false, { message: 'Incorrect username or password.' });

    crypto.pbkdf2(password, rows[0].salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (!crypto.timingSafeEqual(rows[0].hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, rows[0]);
    });
}));

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => { 
{
    if(req.isAuthenticated())
        res.json({ success: true, redirectUrl: '/dashboard' });
    else
        res.json({ success: false, redirectUrl: '/' });
}});

router.post('/signup', (async function(req, res, next) {
try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [req.body.username]);

    if (rows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
    }

    let salt = crypto.randomBytes(16);
    const userID = await generateUniqueUserId();

    const date = String(new Date().getTime());

    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
        if (err) { return next(err); }

        const [rows] = await pool.query('INSERT INTO users (userid, username, date_created, hashed_password, salt) VALUES (?, ?, ?, ?, ?)', [
        userID,
        req.body.username,
        date,
        hashedPassword,
        salt
        ]);
    });

    res.json({message: "Success!"})
}

catch(error)
{
    res.json({errorMessage: error});
}
  }));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({message: "Logged out"});
  });
});

router.get('/getAuthStatus', function(req, res, next) {
    if(req.isAuthenticated())
        res.json({authenticated: true});
    else
    res.json({authenticated: false});
});

router.get('/getUsername', isAuthenticated, (req, res) => {
  res.json({username: req.user.username});
});

module.exports = router;