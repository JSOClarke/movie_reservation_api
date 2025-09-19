import { test, expect, beforeEach, describe } from "@jest/globals";
import request from "supertest";

import app from "../../app.js";
import pool from "../../config/db.js";
import logger from "../../config/logger.js";

beforeEach(async () => {
  await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

const signupTD = [
  {
    title: "Happy Path - return 200",
    username: "freddy",
    password: "cinderellastory",
    role: "user",
    expectedStatus: 200,
    expectedBody: "object",
    expectedProperty: "user_id",
    expectedKeys: ["user_id", "role", "password_hash", "username"],
  },
  {
    title: "Missing username - return 400",
    password: "cinderellastory",
    role: "user",
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
  {
    title: "Missing password - return 400",
    username: "littleman",
    role: "user",
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
  {
    title: "Missing role - return 400",
    username: "littleman",
    password: "cinderellastory",
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
  {
    title: "Incorrect role - return 400",
    username: "fenrir",
    password: "cinderellastory",
    role: "userfff",
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
];

describe("User Routes - Signup - Intergration Test", () => {
  test.each(signupTD)(
    "POST /users/signup  - %s ",
    async ({ username, password, role, expectedStatus, expectedKeys }) => {
      const res = await request(app).post("/users/signup").send({
        username: username,
        password: password,
        role: role,
      });
      logger.info(res);

      expect(res.status).toBe(expectedStatus);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(expectedKeys)
      );
      //   expect(Object.keys(res.body).length).toEqual(expectedKeys?.length);
    }
  );
});

describe("User Routes - Login - Intergration Test", () => {
  test.each(loginTD)(
    "POST /users/signup  - %s ",
    async ({ username, password, role, expectedStatus, expectedKeys }) => {
      const res = await request(app).post("/users/signup").send({
        username: username,
        password: password,
        role: role,
      });
      logger.info(res);

      expect(res.status).toBe(expectedStatus);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(expectedKeys)
      );
      //   expect(Object.keys(res.body).length).toEqual(expectedKeys?.length);
    }
  );
});
