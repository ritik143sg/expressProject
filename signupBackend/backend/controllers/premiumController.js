const { fn, col } = require("sequelize");
const { Expense, User } = require("../models");

const getAllPrimium = async (req, res) => {
  try {
    const expensePrimium = await User.findAll({
      attributes: [
        "id",
        "username",
        [fn("sum", col("Expenses.amount")), "totalCost"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["User.id"],
    });

    res.json({ all: expensePrimium, data: expensePrimium });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllPrimium;
