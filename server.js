const fs = require("fs");

const express = require("express");

const app = express();

const path = require("path");

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require("dotenv").config();

//  Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object

// HTTPS only middleware
const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};
app.use(forceSSL());

app.use(express.static(__dirname + "/dist"));

app.listen(process.env.PORT || 8080);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
