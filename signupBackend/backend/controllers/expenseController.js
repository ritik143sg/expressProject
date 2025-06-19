const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    console.log("data", data);
    const expense = await Expense.create({
      amount: data.amount,
      description: data.description,
      category: data.category,
      UserId: req.user.id,
    });
    res.status(201).json({ msg: "expense Added", expense: expense });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense Adding failed", error: error.message });
  }
};
const getAllExpense = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const expenses = await Expense.findAll({
      where: {
        UserId: user.id,
      },
    });

    res.status(201).json({ msg: "expense retrive", expense: expenses });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense getting failed", error: error.message });
  }
};

const delExpense = async (req, res) => {
  const data = req.user;
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);

    if (expense) {
      await Expense.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({ msg: "expense deleted", expense: expense });
    } else res.status(404).json({ msg: "User Not Found" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense deletion failed", error: error.message });
  }
};

module.exports = { addExpense, getAllExpense, delExpense };
