import logger from "../config/logger.js";
import type { Response, Request } from "express";
import * as movieServices from "../services/movieServices.js";
import { getMoviesSchema } from "../schema/movieSchema.js";

export const getMoviesAll = async (req: Request, res: Response) => {
  // const validatedBody = getMoviesSchema.parse(req.body)

  const response = await movieServices.listMovies();
  if (!response) {
    return res.status(200).json([]);
  }
  res.status(200).json(response);
};

// export const addMovie = async (req: Request, res: Response) => {
//     const validatedBody = getMoviesSchema.parse(req.body)

//     const response = await movieServices.list()

// };
