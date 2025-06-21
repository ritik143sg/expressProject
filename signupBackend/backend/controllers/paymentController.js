const {
  createOrder,
  getPaymentStatus,
} = require("../services/cashFreeService");
const { User, Order } = require("../models");
const { where } = require("sequelize");

const getSesssionId = async (req, res) => {
  const user = req.user;
  //console.log(user);
  try {
    const del = await Order.destroy({
      where: {
        UserId: user.id,
      },
    });

    const orderID = "ORDER_" + Date.now();
    const id = await createOrder(
      orderID,
      199,
      "INR",
      user.id,
      "9988776633",
      user.eamil
    );
    // console.log(id);
    const order = await Order.create({
      OrderId: orderID,
      OrderStatus: "Pending",
      UserId: user.id,
    });
    res.json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const paymentStatus = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const response = await getPaymentStatus(id);
    console.log(response);
    await Order.update({ OrderStatus: response }, { where: { OrderId: id } });

    const updatedOrder = await Order.findOne({ where: { OrderId: id } });
    res.json({ order: updatedOrder });
  } catch (err) {
    console.error("Fetch payment error:", err);
  }
};

module.exports = { getSesssionId, paymentStatus };
