const fs = require("fs");

const express = require("express");

const app = express();

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require("dotenv").config();

app.use(express.static(__dirname + "/dist"));

app.listen(process.env.PORT || 8080);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
