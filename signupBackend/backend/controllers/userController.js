const { comparePassword } = require("../middleWare/bycrypt");
const { encryptPassword } = require("../middleWare/bycrypt");
const User = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const data = req.body;
    const pass = await encryptPassword(data.password);
    console.log(pass);

    console.log(data);

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
        password: pass,
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
      if (!(await comparePassword(data.password, checkUser.password))) {
        res.status(401).json({ msg: "Wrong Password - User Not Authorised " });
      } else res.status(201).json({ msg: "User login successful" });
    }
  } catch (error) {
    res.status(500).json({ msg: "User adding failed", error: error.message });
  }
};

module.exports = { addUser, logUser };
