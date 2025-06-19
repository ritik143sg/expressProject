const Expense = require("./expenseModel");
const User = require("./userModel");

//relation

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = { User, Expense };
