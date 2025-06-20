const Expense = require("./expenseModel");
const Order = require("./orderModel");
const User = require("./userModel");

//relation

User.hasMany(Expense);
Expense.belongsTo(User);

//

User.hasOne(Order);
Order.belongsTo(User);

module.exports = { User, Expense, Order };
