const productModel = require("../model/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    // console.log("createProduct: ", createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const allProduct = await productModel.find({});
  res.status(200).json(allProduct);
};
