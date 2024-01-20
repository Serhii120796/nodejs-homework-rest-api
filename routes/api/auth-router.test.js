import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test /api/users/register", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test signup with correctData", async () => {
    const signupData = {
      email: "friday@gmail.com",
      password: "friday",
    };

    const { statusCode, body } = await request(app).post("/api/users/register").send(signupData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });

  test("test login with correctData", async () => {
    const signinData = {
      email: "friday@gmail.com",
      password: "friday",
    };

    const { statusCode, body } = await request(app).post("/api/users/login").send(signinData);
    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(Object.keys(body.user).length).toBe(2);
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
