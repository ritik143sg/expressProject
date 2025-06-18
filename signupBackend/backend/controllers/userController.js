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
      res.status(500).json({ msg: "User Already Exist " });
    } else {
      const user = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      res.status(201).json({ msg: "User added ", user: user });
    }
  } catch (error) {
    res.status(500).json({ msg: "User add failed ", error: error.message });
  }
};

const logUser = async (req, res) => {
  const data = req.body;
  try {
    const checkUser = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!checkUser) {
      res.status(404).json({ msg: "User Not Exist " });
    } else {
      if (data.password != checkUser.password) {
        res.status(401).json({ msg: "Wrong Password - User Not Authorised " });
      } else res.status(201).json({ msg: "User login sucessful" });
    }
  } catch (error) {
    res.status(500).json({ msg: "User adding failed", error: error.message });
  }
};

module.exports = { addUser, logUser };
