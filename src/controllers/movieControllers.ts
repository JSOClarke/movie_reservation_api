import logger from "../config/logger.js";
import type { Response, Request } from "express";
import * as movieServices from "../services/movieServices.js";
import {
  addMovieSchema,
  removeMovieSchema,
  addShowingSchema,
} from "../schema/movieSchema.js";

export const getMoviesAll = async (req: Request, res: Response) => {
  logger.info(req.query);

  if (Object.keys(req.query).length !== 0) {
    return res.status(400).json({ error: "No queries should be passed" });
  }

  const response = await movieServices.listMovies();
  if (!response) {
    return res.status(200).json([]);
  }
  res.status(200).json(response);
};

export const addMovie = async (req: Request, res: Response) => {
  const validatedBody = addMovieSchema.parse(req.body);

  const response = await movieServices.createMovie(validatedBody);
  res.status(200).json(response);
};

export const removeMovie = async (req: Request, res: Response) => {
  // const movie_id_number = Number(req.params.movie_id);
  // if (isNaN(movie_id_number)) {
  //   return res.status(400).json({ error: "Paramter must be be a number" });
  // }

  const validatedQuery = removeMovieSchema.parse(req.params.movie_id);

  const response = await movieServices.removeMovie(validatedQuery);
  res.status(200).json(response);
};

export const addShowings = async (req: Request, res: Response, next) => {
  const validatedBody = addShowingSchema.parse(req.body);

  try {
    const response = await movieServices.createShowing(validatedBody);
    res.status(200).json(response);
  } catch (err: Error) {
    if (err.code === "23P01") {
      res.status(401).json({ error: "Rooms or Times overlap triggered" });
    }
    next();
  }
};
