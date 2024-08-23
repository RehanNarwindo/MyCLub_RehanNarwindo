const { test, expect, beforeAll, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await User.create({
    username: "Sasha",
    email: "Sasha@gmail.com",
    password: "12345",
    role: "admin",
  });
});

describe("POST /login", () => {
  test("POST /login Success should return access token and username", async () => {
    const response = await request(app).post("/login").send({
      email: "Sasha@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("username", "Sasha");
  });

  test("POST /login Failed should return error message if email is missing", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "12345",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email is required");
  });

  test("POST /login Failed should return error message if password is missing", async () => {
    const response = await request(app).post("/login").send({
      email: "Sasha@gmail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is required");
  });

  test("POST /login Failed should return error message if email/password is required", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email is required");
  });

  test("POST /login Failed should return error message if email not registered", async () => {
    const response = await request(app).post("/login").send({
      email: "notregister@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "email or password is invalid"
    );
  });

  test("POST /login Failed should return error message if password does not match", async () => {
    const response = await request(app).post("/login").send({
      email: "Sasha@gmail.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "email or password is invalid"
    );
  });

  // register
  test("POST /register Success and get input register", async () => {
    const response = await request(app).post("/register").send({
      username: "Test",
      email: "Test@gmail.com",
      password: "12345",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", "Test");
    expect(response.body).toHaveProperty("email", "Test@gmail.com");
  });

  test("POST /register  Failed should be return error message email is required because email empty string", async () => {
    let response = await request(app).post("/register").send({
      username: "Staff",
      email: "",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email is required");
  });

  test("POST /register  Failed should be return error message password is required", async () => {
    let response = await request(app).post("/register").send({
      username: "Staff",
      email: "Staff@gmail.com",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is required");
  });

  test("POST /register  Failed should be return error message username is required", async () => {
    let response = await request(app).post("/register").send({
      username: "",
      email: "Staff@gmail.com",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "username is required");
  });

  test("POST /register  Failed should be return error message email is required because email is null", async () => {
    let response = await request(app).post("/register").send({
      username: "Staff",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email is required");
  });

  test("POST /register  Failed should be return error message password is required because password is null", async () => {
    let response = await request(app).post("/register").send({
      username: "Staff",
      email: "Staff@gmail.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is required");
  });
  test("POST /register  Failed should be return error message username is required because username is null", async () => {
    let response = await request(app).post("/register").send({
      email: "Staff@gmail.com",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "username is required");
  });
  test("POST /register  Failed should be return message must email format", async () => {
    let response = await request(app).post("/register").send({
      username: "Staff2",
      email: "staffgmail.com",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "must email format");
  });
});
