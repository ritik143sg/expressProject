const express = require("express");
const sequelize = require("./utils/DB/DbConnect");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const app = express();

require("./models");

app.use(express.json());
app.use(cors());

const PORT = 4000;

app.use("/user", userRoute);
app.use("/expense", expenseRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on The PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
