const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://git.heroku.com/app-shopex.git",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));

//Routes
const ordersRoute = require("./routes/orders");
const shopsRoute = require("./routes/shops");
app.use("/api/orders", ordersRoute);
app.use("/api/shops", shopsRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
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
