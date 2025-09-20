import {
  test,
  expect,
  beforeEach,
  describe,
  afterEach,
  beforeAll,
} from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import pool from "../../config/db.js";
import logger from "../../config/logger.js";
import { hashPassword } from "../../utils/encryption.js";
const goldenUser = {
  title: "A golden standard user",
  name: "goldengod",
  username: "goldenuser",
  password: "goldenpassword",
  role: "user",
};

beforeAll(async () => {
  await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
  await pool.query(
    `INSERT INTO users (username,password_hash,role) VALUES ($1,$2,$3)`,
    [goldenUser.username, await hashPassword(goldenUser.password), "user"]
  );
});

// afterEach(async () => {
//   await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
// });

const signupTD = [
  {
    title: "Happy Path - return 200",
    username: "freddy",
    password: "cinderellastory",
    role: "user",
    expectedStatus: 200,
    expectedKeys: ["token"],
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
    username: "missingrole",
    password: "missingrole",
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
      //   logger.info(res);

      expect(res.status).toBe(expectedStatus);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(expectedKeys)
      );
      //   expect(Object.keys(res.body).length).toEqual(expectedKeys?.length);
    }
  );
});

const loginTD = [
  {
    title: "Happy path - return 200",
    req: { username: goldenUser.username, password: goldenUser.password },
    expectedStatus: 200,
    expectedKeys: ["token"],
  },
  {
    title: "Incorect username - return 401",
    req: { username: goldenUser.username + 2, password: goldenUser.password },
    expectedStatus: 401,
    expectedKeys: ["error"],
  },
  {
    title: "Incorect password - return 401",
    req: { username: goldenUser.username, password: goldenUser.password + 2 },
    expectedStatus: 401,
    expectedKeys: ["error"],
  },
  {
    title: "Missing username - return 400",
    req: { username: goldenUser.username + 2 },
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
  {
    title: "Missing password - return 400",
    req: { username: goldenUser.username },
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
  {
    title: "Additional Fields  - return 400",
    req: {
      username: goldenUser.username,
      password: goldenUser.password,
      incorrect: "incorrect",
    },
    expectedStatus: 400,
    expectedKeys: ["errors"],
  },
];

describe("User Routes - Login - Intergration Test", () => {
  test.each(loginTD)(
    "POST /users/login  - %s ",
    async ({ req, expectedStatus, expectedKeys }) => {
      const res = await request(app).post("/users/login").send(req);

      expect(res.status).toBe(expectedStatus);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(expectedKeys)
      );
      //   expect(res.body.token).toHaveLength(4);
      //   expect(Object.keys(res.body).length).toEqual(expectedKeys?.length);
    }
  );
});
