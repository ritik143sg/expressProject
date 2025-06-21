const { User } = require("../models");

const getPassword = async (req, res) => {
  const user = req.body;
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    res.json({ user: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = getPassword;
