const request = require("supertest");
import { expect } from "@jest/globals";
import app from "../app";

//test get all blogs endpoint
describe("Test GET blogs", () => {
  test("it should respond with 200 success", async () => {
    await request(app)
      .get("/api/v1/blogs")
      .expect({ message: "success", data: [] })
      .expect(200);
  });
});

// test create new blog end point
describe("Test Create new blog", () => {
  const blogObjectData = {
    title: "new blog",
    description: "this is new blog",
    content: "this is a new blog",
  };

  const blogResponseObject = {
    message: "success",
    data: {
      title: "new blog",
      description: "this is new blog",
      content: "this is a new blog",
    },
  };

  test("It should respond with 201 Created, object of success message and create blog data", async () => {
    const response = await request(app)
      .post("/api/v1/blogs/create")
      .send(blogObjectData)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toMatchObject(blogResponseObject);
  });

  test("It should catch missing required input data", async () => {
    const response = await request(app)
      .post("/api/v1/blogs/create")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
