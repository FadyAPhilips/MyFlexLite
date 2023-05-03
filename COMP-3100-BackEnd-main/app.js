const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const moviesRoutes = require("./routes/movies");
const mongoose = require("mongoose");
const mongodbLink = "mongodb://localhost:27017/MyFlex";
mongoose.connect(mongodbLink, {});
const cors = require("cors");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json());
app.use(userRoutes);
app.use(moviesRoutes);

app.listen(3000, () => {
  console.log("the server is running ");
});
