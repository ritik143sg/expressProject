const express = require("express");
const sequelize = require("./utils/DB/DbConnect");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const { paymentRoute } = require("./routes/paymentRoute");
const { orderRoute } = require("./routes/orderRoute");
const premiumRoute = require("./routes/premiumFeature");
const passwordRoute = require("./routes/passwordRoute");
const app = express();

require("./models");

app.use(express.json());
app.use(cors());

const PORT = 4000;

app.use("/user", userRoute);
app.use("/expense", expenseRoute);
app.use("/payment", paymentRoute);
app.use("/order", orderRoute);
app.use("/premiumFeature", premiumRoute);
app.use("/password", passwordRoute);

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
