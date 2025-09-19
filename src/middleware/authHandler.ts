import type { Request, Response } from "express";
import { verifyToken } from "../auth/jwt_auth.js";

export const authHandler = (req: Request, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "No Authorization Header passed for protected route" });
  }

  try {
    const response = verifyToken(token);
    req.user = response;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Invalid or expired JWT token, please login again" });
  }
};
