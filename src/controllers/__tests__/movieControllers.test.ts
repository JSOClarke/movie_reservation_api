import { test, expect, beforeEach, describe, afterEach } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";
import pool from "../../config/db.js";
import logger from "../../config/logger.js";
import { hashPassword } from "../../utils/encryption.js";
import { seedAllMovies } from "../../seeders/01-Movies.js";

const goldenUser = {
  title: "A golden standard user",
  query: { username: "goldenuser1", password: "goldenpassword1" },
  name: "goldengod1",
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

afterEach(async () => {
  await pool.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

describe("Movie Rotues - Get movies", () => {
  test.each(getMoviesTD)(
    "GET /Movies - %s",
    async ({ query, expectedKeys, expectedStatus }) => {
      const res = await request(app)
        .get("/movies")
        .query(query)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(expectedStatus);
      if (expectedKeys) {
        expect(Object.keys(res.body[0])).toEqual(
          expect.arrayContaining(expectedKeys)
        );
      }
    }
  );
});

const postMovieTD = [
  {
    title: "Happy Path - return 200",
    body: {
      title: "goldenMovie",
      description: "goldenDesc",
      poster: "goldenUrl",
      genre: "golden",
    },
    expectedKeys: ["movie_id"],
    expectedStatus: 200,
  },
  {
    title: "Missing title - return 400",
    body: {
      description: "noTitleDesc",
      poster: "noTitleUrl",
      genre: "noTitle",
    },
    expectedStatus: 400,
  },
  {
    title: "Missing description - return 400",
    body: {
      title: "noDescMovie",
      poster: "noDescUrl",
      genre: "action",
    },
    expectedStatus: 400,
  },
  {
    title: "Missing poster - return 400",
    body: {
      title: "noPosterMovie",
      description: "someDesc",
      genre: "comedy",
    },
    expectedStatus: 400,
  },
  {
    title: "Invalid genre (empty string) - return 400",
    body: {
      title: "badGenreMovie",
      description: "desc",
      poster: "url",
      genre: "",
    },
    expectedStatus: 400,
  },
  {
    title: "Additional Fields - return 400",
    body: {
      title: "extraFieldMovie",
      description: "extraDesc",
      poster: "extraUrl",
      genre: "drama",
      rating: 5,
    },
    expectedStatus: 400,
  },
];

describe("Movie Rotues - POST add movie", () => {
  test.each(postMovieTD)(
    "POST /Movies - %s",
    async ({ body, expectedStatus, expectedKeys }) => {
      const res = await request(app)
        .post("/movies")
        .send(body)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(expectedStatus);
      if (expectedKeys) {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(expectedKeys)
        );
      }
    }
  );
});

const goldenMovie = {
  title: "goldenMovie",
  description: "goldenDesc",
  poster: "goldenUrl",
  genre: "golden",
};

describe("Movie Rotues - DELETE  movie", () => {
  beforeEach(async () => {
    await seedAllMovies();
  });

  const deleteMovieTD = [
    {
      title: "Happy Path - return 200",
      passedObj: {
        movie_id: 1,
      },
      expectedKeys: ["movie_id"],
      expectedStatus: 200,
    },

    {
      title: "Missing movie_id path - return 400",
      passedObj: {
        movie_id: null,
      },
      expectedStatus: 400,
    },
    {
      title: "Incorrect movie_id path - return 400",
      passedObj: {
        movie_id: "incorrectType",
      },
      expectedStatus: 400,
    },
  ];

  test.each(deleteMovieTD)(
    "DELETE /Movies - %s",
    async ({ passedObj, expectedStatus, expectedKeys }) => {
      const res = await request(app)
        .delete(`/movies/${passedObj.movie_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(expectedStatus);
      if (expectedKeys) {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(expectedKeys)
        );
      }
    }
  );
});
