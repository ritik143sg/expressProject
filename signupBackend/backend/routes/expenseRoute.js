const express = require("express");
const {
  getAllExpense,
  addExpense,
  delExpense,
} = require("../controllers/expenseController");

const expenseRoute = express.Router();

expenseRoute.post("/add", addExpense);
expenseRoute.get("/", getAllExpense);
expenseRoute.delete("/:id", delExpense);

module.exports = expenseRoute;
