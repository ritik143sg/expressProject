const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
  try {
    const data = req.body;
    const expense = await Expense.create({
      amount: data.amount,
      description: data.description,
      category: data.category,
    });
    res.status(201).json({ msg: "expense Added", expense: expense });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense Adding failed", error: error.message });
  }
};
const getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    res.status(201).json({ msg: "expense retrive", expense: expenses });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense getting failed", error: error.message });
  }
};

const delExpense = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const expense = await Expense.findByPk(id);

    if (expense) {
      await Expense.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({ msg: "expense deleted", expense: expenses });
    } else res.status(404).json({ msg: "User Not Found" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense deletion failed", error: error.message });
  }
};

module.exports = { addExpense, getAllExpense, delExpense };
