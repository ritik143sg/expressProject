const express = require("express");
const {
  getAllExpense,
  addExpense,
  delExpense,
} = require("../controllers/expenseController");
const { authenticate } = require("../middleWare/authentication");

const expenseRoute = express.Router();

expenseRoute.post("/add", authenticate, addExpense);
expenseRoute.get("/:id", authenticate, getAllExpense);
expenseRoute.delete("/delete/:id", authenticate, delExpense);

module.exports = expenseRoute;
