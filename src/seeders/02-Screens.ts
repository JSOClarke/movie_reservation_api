import pool from "../config/db.js";
import logger from "../config/logger.js";

const screens = [
  { screen_number: 1, seating_max_capacity: 100 },
  { screen_number: 2, seating_max_capacity: 120 },
  { screen_number: 3, seating_max_capacity: 80 },
  { screen_number: 4, seating_max_capacity: 150 },
  { screen_number: 5, seating_max_capacity: 90 },
  { screen_number: 6, seating_max_capacity: 110 },
  { screen_number: 7, seating_max_capacity: 130 },
  { screen_number: 8, seating_max_capacity: 70 },
  { screen_number: 9, seating_max_capacity: 160 },
  { screen_number: 10, seating_max_capacity: 140 },
];

export const seedScreens = async () => {
  let count: number = 0;
  for (const screen of screens) {
    await pool.query(`INSERT INTO screens (seating_max_capacity) VALUES ($1)`, [
      screen.seating_max_capacity,
    ]);
    count = count + 1;
  }
  logger.info(`Seeding Completed, ${count}: Screens Added to DB`);
};
await seedScreens();
