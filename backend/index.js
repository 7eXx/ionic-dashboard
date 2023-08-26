require("dotenv").config();

const connection = require("./db");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();

const users = require("./routes/users");
const auth = require("./routes/auth");


connection();
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    secure: false,
    cookie: {
        saveUninitialized: false,
        maxAge: 24 * 60 * 60
    }
}));

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));