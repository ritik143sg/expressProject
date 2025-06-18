const express = require("express");
const { addUser } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/add", addUser);

module.exports = userRoute;
