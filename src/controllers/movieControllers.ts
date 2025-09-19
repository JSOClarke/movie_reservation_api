import logger from "../config/logger.js";
import type { Response, Request } from "express";
import * as movieServices from "../services/movieServices.js";

export const addMovie = async (req: Request, res: Response) => {
  //   const { title,description,poster,genere} = req.body;
  try {
    const response = await movieServices.createMovie();
    logger.info(response);
  } catch (err: Error) {
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};
