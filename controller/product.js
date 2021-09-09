const productModel = require("../model/Product");

exports.hello = (req, res) => {
  res.send("안녕하세요");
};

exports.createProduct = (req, res, next) => {
  const createdProduct = productModel.create(req.body);
  res.status(201).json(createdProduct);
};
