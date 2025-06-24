const { User } = require("../models");
const Expense = require("../models/expenseModel");
const sequelize = require("../utils/DB/DbConnect");

const addExpense = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const data = req.body;

    const expense = await Expense.create(
      {
        amount: data.amount,
        description: data.description,
        category: data.category,
        UserId: req.user.id,
      },
      { transaction }
    );
    const cost = await User.findByPk(req.user.id);
    console.log(typeof data.amount);
    await User.update(
      { totalCost: cost.totalCost + Number(data.amount) },
      {
        where: {
          id: req.user.id,
        },
        transaction,
      }
    );
    (await transaction).commit();
    res.status(201).json({ msg: "expense Added", expense: expense });
  } catch (error) {
    (await transaction).rollback();
    res
      .status(500)
      .json({ msg: "expense Adding failed", error: error.message });
  }
};
const getAllExpense = async (req, res) => {
  const user = req.user;
  const pageId = req.params.id;
  try {
    const expenses = await Expense.findAll({
      where: {
        UserId: user.id,
      },
      limit: 3,
      order: [["createdAt", "DESC"]],
      offset: (Number(pageId) - 1) * 3,
    });

    const expenses1 = await Expense.findAll({
      where: {
        UserId: user.id,
      },
      limit: 3,
      order: [["createdAt", "DESC"]],
      offset: Number(pageId) * 3,
    });

    let pre = false;
    let curr = false;
    let next = false;

    if (pageId != 1) {
      pre = true;
    }
    if (expenses.length > 0) {
      curr = true;
    }

    if (expenses1.length > 0) {
      next = true;
    }

    res.status(201).json({
      msg: "expense retrive",
      expense: expenses,
      page: { pre, curr, next, pageId },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "expense getting failed", error: error.message });
  }
};

const delExpense = async (req, res) => {
  const data = req.user;
  const transaction = await sequelize.transaction();
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);

    if (expense) {
      await Expense.destroy({
        where: {
          id: id,
        },
        transaction,
      });
      const cost = await User.findByPk(req.user.id);
      await User.update(
        { totalCost: cost.totalCost - expense.amount },
        {
          where: {
            id: req.user.id,
          },
          transaction,
        }
      );
      (await transaction).commit();
      res.status(201).json({ msg: "expense deleted", expense: expense });
    } else res.status(404).json({ msg: "User Not Found" });
  } catch (error) {
    (await transaction).rollback();
    res
      .status(500)
      .json({ msg: "expense deletion failed", error: error.message });
  }
};

module.exports = { addExpense, getAllExpense, delExpense };
