const express = require("express");
const getPassword = require("../controllers/passwordController");

const passwordRoute = express.Router();

passwordRoute.post("/forgetPassword", getPassword);

module.exports = passwordRoute;
