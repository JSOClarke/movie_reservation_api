import type { Request, Response } from "express";
import {
  gatherShowings,
  gatherShowingSeats,
} from "../services/showingServices.js";
import { showingSeatsSchema } from "../schema/showingSchema.js";
import logger from "../config/logger.js";

export const listShowings = async (req: Request, res: Response) => {
  //ability to filter by movie and by specific date for showings. TO BE ADDED

  const response = await gatherShowings();
  res.status(200).json(response);
};

export const listShowingSeats = async (req: Request, res: Response) => {
  // for checking for the availabe seats maybe we can do the check the bookings current bookings for the specific showing.

  const validatedParam = showingSeatsSchema.parse(req.params.show_id);

  const response = await gatherShowingSeats(validatedParam);
  res.status(200).json(response);
};
