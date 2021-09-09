const httpMocks = require("node-mocks-http");
const productController = require("../../controller/product");
const productModel = require("../../model/Product");
const newProduct = require("../data/newProduct.json");

productModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  test("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  test("should call Product.create", () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  test("should return 201 response status code", () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
