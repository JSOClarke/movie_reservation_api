// src/middleware/errorHandler.js
import type { Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(err: Error, req: Request, res: Response, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request",
      errors: err.message,
    });
  }

  console.error("Unhandled error:", err);

  res.status(500).json({
    message: "Server error",
  });
}
