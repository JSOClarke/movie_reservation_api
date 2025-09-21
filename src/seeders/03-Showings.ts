import { start } from "repl";
import pool from "../config/db.js";
import logger from "../config/logger.js";

const showings = [
  {
    movie_id: 1,
    price: 10,
    screen_id: 1,
    seating_curr_capacity: 10,
    duration: 2,
    number_of_showings: 15,
  },
];

const seedShowings = async () => {
  await pool.query(`TRUNCATE TABLE showings RESTART IDENTITY CASCADE`);
  // Use a movie from the movie list and then seed a whole lot of showings for the day basically.

  // Create showings

  let baseline_date = new Date("2025-05-09");

  const query = `
      INSERT INTO showings (
        movie_id,
        showtimes,
        price,
        screen_id,
        seating_curr_capacity
      ) VALUES (
        $1,
        tstzrange($2, $3, '[)'),
        $4,
        $5,
        $6
      )
      RETURNING show_id;
      `;
  for (const showing of showings) {
    for (let i = 0; i < showing.number_of_showings; i++) {
      const start_date = new Date(baseline_date);

      const gap = 1; // 1 Hour gap between movies for cleaning
      start_date.setHours(start_date.getHours() + gap);

      const end_date = new Date(start_date);
      end_date.setHours(start_date.getHours() + showing.duration);

      baseline_date = new Date(end_date);

      const response = await pool.query(query, [
        showing.movie_id,
        start_date.toISOString(),
        end_date.toISOString(),
        showing.price,
        showing.screen_id,
        showing.seating_curr_capacity,
      ]);
      logger.info(
        `SHOW ID: ${
          response.rows[0].show_id
        }Start Date: ${start_date.toISOString()}, End Date: ${end_date.toISOString()}`
      );
    }
  }
};

await seedShowings();
