import pool from "../config/db.js";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const gatherShowings = async () => {
  const query = `SELECT *,lower(showtimes) AS start_time, upper(showtimes) AS end_time FROM showings JOIN movies m ON m.movie_id =showings.movie_id`;
  const response = await pool.query(query);
  return response.rows;
};
