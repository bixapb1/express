const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ massage: err });
  }
});

router.post("/", async (req, res) => {
  const order = new Order({
    Name: req.body.Name,
    Phone: req.body.Phone,
  });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ massage: err });
  }
});

module.exports = router;
