import express from "express";
import bodyParser from "body-parser";

const logger = (req, res, next) => {
  console.log("Custom Middleware called");
  next();
};

app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.requestAt = new Date().toISOString();
  next();
});

module.exports = app;
