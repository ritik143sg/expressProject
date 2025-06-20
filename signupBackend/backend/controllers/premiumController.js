const { Expense, User } = require("../models");

const getAllPrimium = async (req, res) => {
  try {
    const expensePrimium = await Expense.findAll();
    console.log(expensePrimium);

    let data = [];
    let flag = [];

    for (let i = 0; i < expensePrimium.length; i++) {
      if (flag.includes(expensePrimium[i].UserId)) {
        continue;
      }

      const example = {};
      let amount = 0;

      for (let j = 0; j < expensePrimium.length; j++) {
        if (expensePrimium[i].UserId === expensePrimium[j].UserId) {
          amount += expensePrimium[j].amount;
        }
      }

      const name = await User.findByPk(expensePrimium[i].UserId);

      example.amount = amount;
      example.name = name.username;
      example.id = expensePrimium[i].UserId;
      data.push(example);
      flag.push(expensePrimium[i].UserId);
    }

    res.json({ all: expensePrimium, data: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllPrimium;
