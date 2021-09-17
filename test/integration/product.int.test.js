const request = require("supertest");
const app = require("../../index");
const newProduct = require("../data/newProduct.json");

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
});
