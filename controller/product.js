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
  try {
    const allProduct = await productModel.find({});
    res.status(200).json(allProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) res.status(200).json(product);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      },
    );
    if (updatedProduct) res.status(200).json(updatedProduct);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(
      req.params.productId,
    );
    if (deletedProduct) res.status(200).json(deletedProduct);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};
