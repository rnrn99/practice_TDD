const request = require("supertest");
const app = require("../../index");
const newProduct = require("../data/newProduct.json");

let firstProduct;

const updatedProduct = {
  name: "updated name",
  description: "updated description",
};

test("POST /api/product", async () => {
  const response = await request(app).post("/api/product").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

test("should return 500 on POST /api/product", async () => {
  const response = await request(app)
    .post("/api/product")
    .send({ name: "error test" });
  expect(response.statusCode).toBe(500);
  // console.log(response.body);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

test("GET /api/product", async () => {
  const response = await request(app).get("/api/product");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

test("GET /api/product/:productId", async () => {
  const response = await request(app).get(`/api/product/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

test("should return 404 on GET /api/product/:productId", async () => {
  const response = await request(app).get(
    "/api/product/613efe856dd313368f2bb9c5",
  );
  expect(response.statusCode).toBe(404);
});

test("PUT /api/product/:productId", async () => {
  const response = await request(app)
    .put(`/api/product/${firstProduct._id}`)
    .send(updatedProduct);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(updatedProduct.name);
  expect(response.body.description).toBe(updatedProduct.description);
});

test("should return 404 on PUT /api/product/:productId", async () => {
  const response = await request(app)
    .put("/api/product/613efe856dd313368f2bb9c4")
    .send(updatedProduct);
  expect(response.statusCode).toBe(404);
});

test("DELETE /api/product/:productId", async () => {
  const response = await request(app)
    .delete(`/api/product/${firstProduct._id}`)
    .send();
  expect(response.statusCode).toBe(200);
});

test("should return 404 on DELETE /api/product/:productId", async () => {
  const response = await request(app)
    .put("/api/product/613efe856dd313368f2bb9c6")
    .send();
  expect(response.statusCode).toBe(404);
});
