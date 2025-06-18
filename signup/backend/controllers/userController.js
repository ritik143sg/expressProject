const User = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const data = req.body;

    const checkUser = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (checkUser) {
      res.status(500).json({ msg: "User Already Exist" });
    } else {
      const user = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      res.status(201).json({ msg: "User added", user: user });
    }
  } catch (error) {
    res.status(500).json({ msg: "User add failed", error: error.message });
  }
};

module.exports = { addUser };
