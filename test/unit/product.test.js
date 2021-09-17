const httpMocks = require("node-mocks-http");
const productController = require("../../controller/product");
const productModel = require("../../model/Product");
const newProduct = require("../data/newProduct.json");
const allProduct = require("../data/allProduct.json");

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

let req, res, next;
const productId = "613efebe4e6ce199056d5453";
const updatedProduct = {
  name: "updated name",
  description: "updated description",
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  test("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  test("should call Product.create", async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  test("should return 201 response status code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  test("should handle error", async () => {
    const errorMsg = { message: "some properties are missing" };
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMsg);
  });
});

describe("Product Controller Get", () => {
  test("should have a getProduct function", () => {
    expect(typeof productController.getProduct).toBe("function");
  });

  test("should call productModel.find({})", async () => {
    await productController.getProduct(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  test("should return 200 response status code", async () => {
    await productController.getProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should return json body in response", async () => {
    productModel.find.mockReturnValue(allProduct);
    await productController.getProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProduct);
  });

  test("should handle error", async () => {
    const errorMsg = { message: "Failed to find product data." };
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMsg);
  });
});

describe("Product Controller GetById", () => {
  test("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function");
  });

  test("should call productModel.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(productModel.findById).toBeCalledWith(productId);
  });

  test("should return json body and response code 200", async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should return 404 when item doesn't exist", async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should handle error", async () => {
    const errorMsg = { message: "Failed to get product by Id" };
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMsg);
  });
});

describe("Product Controller Update", () => {
  test("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function");
  });

  test("should call productModel.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true },
    );
  });

  test("should return json body and response code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should return 404 when item doesn't exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should handle error", async () => {
    const errorMsg = { message: "Failed to update product" };
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMsg);
  });
});

describe("Product Controller Delete", () => {
  test("should have a deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function");
  });

  test("should call productModel.findByIdAndDelete", async () => {
    req.params.productId = productId;
    await productController.deleteProduct(req, res, next);
    expect(productModel.findByIdAndDelete).toBeCalledWith(productId);
  });

  test("should return deleted data and response code 200", async () => {
    let deletedProduct = {
      name: "deleted name",
      description: "it is deleted",
    };
    productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should return 404 when item doesn't exist", async () => {
    productModel.findByIdAndDelete.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test("should handle error", async () => {
    const errorMsg = { message: "Failed to delete product" };
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMsg);
  });
});
