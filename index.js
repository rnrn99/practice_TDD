const express = require("express");
const app = express();
const port = 5000;

const productRoutes = require("./routes");

app.use(express.json());

app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
