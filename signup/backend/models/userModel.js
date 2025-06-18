const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/DbConnect");

const User = sequelize.define("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  username: { allowNull: false, type: DataTypes.STRING },
  email: { allowNull: false, type: DataTypes.STRING },
  password: { allowNull: false, type: DataTypes.STRING },
});

module.exports = User;
