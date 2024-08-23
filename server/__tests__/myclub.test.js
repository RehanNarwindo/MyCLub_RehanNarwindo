const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { User, MyClub } = require("../models/index");

let access_token;
let access_token2;

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await MyClub.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  const admin = await User.create({
    username: "Sasha2",
    email: "Sasha2@gmail.com",
    password: "12345",
    role: "admin",
    phoneNumber: "08777777",
    address: "Jakarta",
  });

  const admin2 = await User.create({
    username: "Sasha2",
    email: "Sasha2@gmail.com",
    password: "12345",
    role: "admin",
    phoneNumber: "08777777",
    address: "Jakarta",
  });

  const data = {
    email: admin.email,
    id: admin.id,
  };

  const data2 = {
    email: admin2.email,
    id: admin2.id,
  };

  access_token = createToken(data);
  access_token2 = createToken(data2);
});

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await MyClub.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("MyClub Routes Test", () => {
  test("POST /myClub - create MyClub - success", async () => {
    const response = await request(app)
      .post("/myClub")
      .send({
        id: "16",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("club_name");
    expect(response.body).toHaveProperty("club_logo");
    expect(response.body).toHaveProperty("id_rapidAPI", 16);
    expect(response.body).toHaveProperty("user_id", 1);
  });

  test("GET /myClub - get MyClub - success", async () => {
    const response = await request(app)
      .get("/myClub")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.myclub).toHaveProperty("id");
    expect(response.body.myclub).toHaveProperty("club_name");
    expect(response.body.myclub).toHaveProperty("club_logo");
    expect(response.body.myclub).toHaveProperty("id_rapidAPI");
    expect(response.body.myclub).toHaveProperty("user_id", 1);
  });

  test("GET /myClub - get MyClub - no data", async () => {
    await MyClub.destroy({ where: {} });

    const response = await request(app)
      .get("/myClub")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: [] });
  });

  test("GET /myClub - get MyClub - transfermarkt API error", async () => {
    jest.mock("../helpers/transfermarkt", () => {
      return jest.fn().mockImplementation(() => {
        throw new Error("API error");
      });
    });

    const response = await request(app)
      .get("/myClub")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data", []);
  });

  test("GET /myClub/search - get MyClub", async () => {
    const response = await request(app)
      .get("/myClub/search?search=man")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("DELETE /myClub/:id - delete MyClub - Unauthorized", async () => {
    const myClub = await MyClub.create({
      club_name: "Borussia Dortmund",
      club_logo: "some_logo_url",
      id_rapidAPI: 16,
      user_id: 1,
    });

    const response = await request(app)
      .delete(`/myClub/${myClub.id}`)
      .set("Authorization", `Bearer ${access_token2}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Unauthorized");
  });

  test("DELETE /myClub/:id - delete MyClub - success", async () => {
    const myClub = await MyClub.create({
      club_name: "Borussia Dortmund",
      club_logo: "some_logo_url",
      id_rapidAPI: 16,
      user_id: 1,
    });

    const response = await request(app)
      .delete(`/myClub/${myClub.id}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Success delete Borussia Dortmund"
    );
  });

  test("DELETE /myClub/:id - delete MyClub - not found", async () => {
    const response = await request(app)
      .delete("/myClub/999")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Myclub not found");
  });
});
