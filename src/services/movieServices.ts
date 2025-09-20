import pool from "../config/db.js";
import { PrismaClient } from "../generated/prisma";
import type {
  addMovieInput,
  addShowingInput,
  removeMovieInput,
} from "../schema/movieSchema.js";

const prisma = new PrismaClient();

export const createMovie = async ({
  title,
  description,
  genre,
  poster,
}: addMovieInput) => {
  const movie_id = await prisma.movies.create({
    data: {
      title: title,
      description: description,
      genre: genre,
      poster: poster,
    },
    select: {
      movie_id: true,
    },
  });

  return movie_id;
};

export const listMovies = async () => {
  const movies = await prisma.movies.findMany({
    orderBy: { genre: "asc" },
  });
  return movies;
};

export const removeMovie = async (movie_id: removeMovieInput) => {
  const movie_id_return = await prisma.movies.delete({
    where: { movie_id: movie_id },
    select: {
      movie_id: true,
    },
  });
  return movie_id_return;
};

export const createScreening = async ({
  movie_id,
  start_time,
  end_time,
  price,
  screen_id,
  seating_curr_capacity,
}: addShowingInput) => {
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

  const result = await pool.query(query, [
    movie_id,
    start_time.toISOString(), // pass as ISO string
    end_time.toISOString(),
    price,
    screen_id,
    seating_curr_capacity,
  ]);

  return result.rows[0];
};
