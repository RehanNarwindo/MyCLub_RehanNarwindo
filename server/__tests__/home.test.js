const { test, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

describe("Home Controller", () => {
  test("GET /news should respond with news data", async () => {
    const response = await request(app).get("/home/news");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test("GET /news should respond with news data page 2", async () => {
    const response = await request(app).get("/home/news?page=2");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test("GET /schedule should respond with schedule data", async () => {
    const response = await request(app).get("/home/schedule");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });
});
