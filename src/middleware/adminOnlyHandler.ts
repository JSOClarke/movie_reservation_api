import type { Request, Response } from "express";
import logger from "../config/logger.js";

export const adminOnlyHandler = async (req: Request, res: Response, next) => {
  // Check the token for the user then look for the role of the user.
  const role = req.user.role;
  // logger.info(`Role found: ${role}, passe checks`);

  if (role !== "admin") {
    return res
      .status(400)
      .json({ error: "User rights not allowed for operation" });
  }

  next();
};
