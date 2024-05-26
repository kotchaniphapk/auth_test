const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const { json } = require("body-parser");

const db = require("./db/config");
const UserController = require("./api/UserController");

const app = express();
app.use(json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cors());

// load the controllers
app.use(UserController(app));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
  db.sync();
});

module.exports = app;
