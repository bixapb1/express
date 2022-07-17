const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const shopsRoute = require("./routes/shops");
const ordersRoute = require("./routes/orders");
app.use("/api/shops", shopsRoute);
app.use("/api/orders", ordersRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
  },
  () => console.log("conect DB")
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server start PORT:${PORT}`);
});
