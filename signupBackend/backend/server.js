const express = require("express");
const sequelize = require("./utils/DB/DbConnect");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 4000;

app.use("/user/signup", userRoute);

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
