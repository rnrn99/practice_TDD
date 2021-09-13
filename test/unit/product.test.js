const httpMocks = require("node-mocks-http");
const productController = require("../../controller/product");
const productModel = require("../../model/Product");
const newProduct = require("../data/newProduct.json");

productModel.create = jest.fn();
productModel.find = jest.fn();

let req, res, next;

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
});
