const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
const passport = require("passport");
const patentsRoutes = require("./routes/patents");
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");

if(process.env.NODE_ENV !== 'production')
    dotenv.config();

const app = express();
app.use(express.json());


let options = {
    host: process.env.MYSQL_HOST, // Host name for database connection.
    user: process.env.MYSQL_USER, // Database user.
    password: process.env.MYSQL_PASSWORD, // Password for the above database user.
    database: process.env.MYSQL_DATABASE, // Database name
};

let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

app.use(session({ 
    secret: ",xnv43732*7^53xb", 
    resave: false, 
    saveUninitialized: false, 
    store: sessionStore
}));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.use("/patents", patentsRoutes);
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});