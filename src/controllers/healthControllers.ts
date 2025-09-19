import logger from "../config/logger.js";
import type { Request, Response } from "express";

export const healthCheckServer = async (req: Request, res: Response) => {
  logger.info(`Server is up and running`);
  return res.status(200).json("Server up and running");
};
