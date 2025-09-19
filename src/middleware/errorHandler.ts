// src/middleware/errorHandler.js
import type { Request, Response } from "express";
import { ZodError } from "zod";
import logger from "../config/logger.js";

export function errorHandler(err: any, req: Request, res: Response, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request",
      errors: err.message,
    });
  }
  // // Code when error is thrown on
  //   if (err.code === "P2025") {
  //     return res
  //       .status(400)
  //       .json({ error: "No user was found with that username" });
  //   }
  logger.error("Unhandled error:", err);

  res.status(500).json({
    message: "Server error",
  });
}
