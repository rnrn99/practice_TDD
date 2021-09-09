const productModel = require("../model/Product");

exports.hello = (req, res) => {
  res.send("안녕하세요");
};

exports.createProduct = (req, res, next) => {
  productModel.create(req.body);
  res.status(201).send();
};
