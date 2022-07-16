const express = require("express");
const router = express.Router();
const shops = require("../data.json");
router.get("/", async (req, res) => {
  try {
    res.json(shops);
  } catch (err) {
    res.json({ massage: err });
  }
});

module.exports = router;
