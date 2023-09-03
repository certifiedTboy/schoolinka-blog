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

// test delete blog end point
describe("Test Delete Blog blogs", () => {
  test("it should respond with 200 success", async () => {
    await request(app)
      .delete(`/api/v1/blogs/${6}/delete`)
      .expect(200)
      .expect({ message: "Post deleted successfully" });
  });

  test("it should respond with 404 Not found Error", async () => {
    await request(app)
      .delete("/api/v1/blogs/100000/delete")
      .expect(422)
      .expect({ message: "delete blog failed" });
  });
});

// test update blog end point
describe("Test Update blog data", () => {
  const blogObjectData = {
    title: "update blog",
    description: "this is update blog",
    content: "this is a update blog",
  };

  const blogResponseObject = {
    message: "Post updated successfully",
    data: {
      title: "update blog",
      description: "this is update blog",
      content: "this is a update blog",
    },
  };

  test("It should respond with 200 ok, object of success message and updated blog data", async () => {
    const response = await request(app)
      .put(`/api/v1/blogs/${7}/update`)
      .send(blogObjectData)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toMatchObject(blogResponseObject);
  });

  test("It should catch missing required input data", async () => {
    const response = await request(app)
      .put(`/api/v1/blogs/${7}/update`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
