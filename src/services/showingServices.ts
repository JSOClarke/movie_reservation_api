import pool from "../config/db.js";
import { PrismaClient } from "../generated/prisma";
import type { showingSeatsSchemaInput } from "../schema/showingSchema.js";
const prisma = new PrismaClient();

export const gatherShowings = async () => {
  const query = `SELECT 
  m.movie_id,
  m.title,
  m.genre,
  m.poster,
  json_agg(
    json_build_object(
      'start_time', lower(s.showtimes),
      'end_time', upper(s.showtimes),
      'screen_id', s.screen_id
    )
  ) AS showtimes
FROM showings s
JOIN movies m ON m.movie_id = s.movie_id
GROUP BY m.movie_id, m.title
ORDER BY m.movie_id;
`;
  const response = await pool.query(query);
  return response.rows;
};

export const gatherShowingSeats = async (
  screen_id: showingSeatsSchemaInput
) => {
  const response = await prisma.seats.findMany({
    where: {
      screen_id: screen_id,
    },
  });
  return response;
};
