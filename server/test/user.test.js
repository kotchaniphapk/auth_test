const request = require("supertest");

const db = require("../db/config");
const app = require("../server");

describe("Get /user", () => {
  it("Should get all users", async () => {
    await request(app)
      .get("/users")
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("POST /user -> new user", () => {
  it("should create a new user", async () => {
    await request(app)
      .post("/users")
      .send({ name: "test", email: "test@gmail.com", password: "123456789" })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("POST /user -> existing email", () => {
  it("should not create a new user", async () => {
    await request(app)
      .post("/users")
      .send({ name: "test", email: "test@gmail.com", password: "123456789" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe("POST /users/login -> Login", () => {
  it("correct and user should login", async () => {
    await request(app)
      .post("/users/login")
      .send({ email: "test@gmail.com", password: "123456789" })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it("wrong email", async () => {
    await request(app)
      .post("/users/login")
      .send({ email: "something@gmail.com", password: "123456789" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });

  it("wrong password", async () => {
    await request(app)
      .post("/users/login")
      .send({ email: "test@gmail.com", password: "123" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });

});

// remove the user
db.User.destroy({ where: { email: "test@gmail.com" } });