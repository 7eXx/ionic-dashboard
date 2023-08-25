require("dotenv").config();

const connection = require("./db");
const express = require("express");
const app = express();

const users = require("./routes/users");
const auth = require("./routes/auth");


connection();
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));