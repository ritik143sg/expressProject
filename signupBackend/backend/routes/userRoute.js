const express = require("express");
const { addUser, logUser } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/signup/add", addUser);
userRoute.post("/login", logUser);

module.exports = userRoute;
