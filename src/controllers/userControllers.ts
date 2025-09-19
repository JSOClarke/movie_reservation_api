import * as userServices from "../services/userServices.js";
import type { Response, Request } from "express";
import {
  userSchema,
  type UserInputSignUp,
  type UserInputLogin,
  userLoginSchema,
} from "../schema/userSchema.js";
import { comparedHash, hashPassword } from "../utils/encryption.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../config/logger.js";
import { createToken } from "../auth/jwt_auth.js";

dotenv.config();

export const userSignup = async (req: Request, res: Response) => {
  //   const { username, password_hash, role } = req.body;

  const validatedBody: UserInputSignUp = userSchema.parse(req.body);

  const validBody = {
    username: validatedBody.username,
    password: await hashPassword(validatedBody.password, 10),
    role: validatedBody.role,
  };

  const response = await userServices.signupUser(validBody);

  const token = createToken({
    user_id: response.user_id,
    username: response.username,
  });

  res.status(200).json({ token: token });
};

// export const login = async()

export const userLogin = async (req: Request, res: Response, next: any) => {
  const validatedBody = userLoginSchema.parse(req.body);

  try {
    const response = await userServices.loginUser(validatedBody.username);

    if (!response) {
      return res
        .status(401)
        .json({ error: "No user was found with that username" });
    }
    const isMatchHash = await comparedHash(
      validatedBody.password,
      response.password_hash
    );

    if (!isMatchHash) {
      res.status(401).json({ error: "Invalid Password Provided" });
    }

    const token = createToken({
      user_id: response.user_id,
      username: response.username,
    });

    res.status(200).json({ token: token });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
