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
const { User, MyDreamClub, MyPlayersList } = require("../models/index");

let access_token;
let access_token2;

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await MyDreamClub.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await MyPlayersList.destroy({
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
    username: "Sasha3",
    email: "Sasha3@gmail.com",
    password: "12345",
    role: "admin",
    phoneNumber: "08777777",
    address: "Jakarta",
  });

  await MyDreamClub.create({
    dream_club_name: "test club",
    logo: "test url logo",
    stadium: "test stadium",
    user_id: 1,
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

  await MyDreamClub.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await MyPlayersList.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("MyDreamClub Routes Test", () => {
  test("POST /myDreamClub - create MyDreamClub - success", async () => {
    const response = await request(app)
      .post("/myDreamClub")
      .send({
        name: "Dream FC",
        logo: "https://example.com/logo.png",
        stadium: "Dream Stadium",
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Success create my dream club Dream FC"
    );
  });

  test("GET /myDreamClub - get MyDreamClub - success", async () => {
    const response = await request(app)
      .get("/myDreamClub")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();
    expect(response.body.data).toHaveProperty("dream_club_name");
    expect(response.body.data).toHaveProperty("logo");
    expect(response.body.data).toHaveProperty("stadium");
    expect(response.body.data).toHaveProperty("user_id");
    expect(response.body.data.MyPlayersLists).toBeInstanceOf(Array);
  });

  test("DELETE /myDreamClub/:id - delete MyDreamClub - success", async () => {
    const deleteResponse = await request(app)
      .delete(`/myDreamClub/1`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      `Success delete test club`
    );
  });

  test("GET /myDreamClub - get MyDreamClub - data : null", async () => {
    const response = await request(app)
      .get("/myDreamClub")
      .set("Authorization", `Bearer ${access_token2}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data", null);
  });

  //   test("POST /myDreamClub/generateLogo - generate logo - success", async () => {
  //     const response = await request(app)
  //       .post("/myDreamClub/generateLogo")
  //       .send({
  //         prompt: "a football club logo with eagle theme",
  //       })
  //       .set("Authorization", `Bearer ${access_token}`)
  //       .timeout(10000);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("imageUrl");
  //   });

  test("GET /myDreamClub/searchPlayer - search player - success", async () => {
    const response = await request(app)
      .get("/myDreamClub/searchPlayer?search=Messi")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("POST /myDreamClub/setPlayer - set player - success", async () => {
    const createResponse = await request(app)
      .post("/myDreamClub")
      .send({
        dream_club_name: "Dream FC",
        logo: "https://example.com/logo.png",
        stadium: "Dream Stadium",
      })
      .set("Authorization", `Bearer ${access_token}`);

    const dreamClubId = createResponse.body.id;

    const setPlayerResponse = await request(app)
      .post("/myDreamClub/setPlayer")
      .send({
        idPlayer: 1,
        idRapidapi: 123456,
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(setPlayerResponse.status).toBe(201);
    expect(setPlayerResponse.body).toHaveProperty(
      "message",
      "Success set player Michael Geisler as GK"
    );
  });

  test("POST /myDreamClub - create MyDreamClub - incomplete data", async () => {
    const response = await request(app)
      .post("/myDreamClub")
      .send({})
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(403);

    expect(response.body).toHaveProperty(
      "message",
      "Data MyDream Club Not complete"
    );
  });

  test("POST /myDreamClub/setPlayer - set player - player not found", async () => {
    const response = await request(app)
      .post("/myDreamClub/setPlayer")
      .send({
        idPlayer: 999,
        idRapidapi: 123456,
      })
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Player Not Found");
  });
});
