const Expense = require("./expenseModel");
const ForgotPasswordRequest = require("./ForgotPasswordRequestsModel");
const Order = require("./orderModel");
const User = require("./userModel");

//relation

User.hasMany(Expense);
Expense.belongsTo(User);

//

User.hasOne(Order);
Order.belongsTo(User);

//

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

module.exports = { User, Expense, Order };
