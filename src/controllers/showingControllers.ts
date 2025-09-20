import type { Request, Response } from "express";
import { gatherShowings } from "../services/showingServices.js";

export const listShowings = async (req: Request, res: Response) => {
  const response = await gatherShowings();
  res.status(200).json(response);
};
