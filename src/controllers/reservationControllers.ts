import type { Request, Response } from "express";
import logger from "../config/logger.js";
import { createBookingSchema } from "../schema/reservatoinSchema.js";
import { addBooking } from "../services/reservationServices.js";

export const createBooking = async (req: Request, res: Response) => {
  const validatedBody = createBookingSchema.parse(req.body);

  const addBookingParams = { ...validatedBody, user_id: req.user.user_id };
  logger.info(addBookingParams);

  const response = await addBooking(addBookingParams);
  res.status(200).json(response);
};
