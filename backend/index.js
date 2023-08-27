require("dotenv").config();

const connection = require("./db");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cors = require('cors');
const app = express();

const users = require("./routes/users");
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const items = require("./routes/items");


connection();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:8100', "http://127.0.0.1:8100", "http://192.168.0.95:8100"],
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/notes", notes);
app.use("/api/items", items);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}...`));