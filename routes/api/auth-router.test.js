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

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correctData", async () => {
    const signupData = {
      email: "saturda@gmail.com",
      password: "saturda",
    };

    const { statusCode, body } = await request(app).post("/api/users/register").send(signupData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });
});
