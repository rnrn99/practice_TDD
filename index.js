const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const productRoutes = require("./routes");

mongoose
  .connect(
    "mongodb+srv://practice_tdd:passwordtdd@practice.lmq5s.mongodb.net/practiceTDD?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    },
  )
  .then(() => console.log("mongoDB connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/product", productRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
