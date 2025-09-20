import { test, expect, beforeEach, describe } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import pool from "../../config/db.js";
import logger from "../../config/logger.js";
import { hashPassword } from "../../utils/encryption.js";

const goldenUser = {
  title: "A golden standard user",
  query: { username: "goldenuser", password: "goldenpassword" },
  name: "goldengod",
  role: "user",
};

const getMoviesTD = [
  {
    title: "Happy Path - Return 200",
    query: {},
    expectedKeys: ["title", "description", "poster", "genre"],
    expectedStatus: 200,
  },
  {
    title: "Additional Queries - Return 400",
    query: { additionalQuery: "additionalQuery" },
    expectedKeys: ["title", "description", "poster", "genre"],
    expectedStatus: 400,
  },
];

let token: string;

beforeEach(async () => {
  await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
  await pool.query(
    `INSERT INTO users (username,password_hash,role) VALUES ($1,$2,$3)`,
    [
      goldenUser.query.username,
      await hashPassword(goldenUser.query.password),
      "user",
    ]
  );
  const response = await request(app)
    .post("/users/login")
    .send(goldenUser.query);

  logger.info(`Reposne: ${response}`);
  token = response.body.token;
});

describe("Movie Rotues - Get movies", () => {
  test.each(getMoviesTD)(
    "GET /Movies - %s",
    async ({ query, expectedKeys, expectedStatus }) => {
      const res = await request(app)
        .get("/movies")
        .query(query)
        .set("Authorization", `Bearer ${token}`);

      logger.info(`token ${token}`);

      expect(res.status).toBe(expectedStatus);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining(expectedKeys)
      );
    }
  );
});
