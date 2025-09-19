import * as userServices from "../services/userServices.js";
import type { Response, Request } from "express";
import { userSchema, type UserInput } from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userSignup = async (req: Request, res: Response) => {
  //   const { username, password_hash, role } = req.body;

  const validatedBody: UserInput = userSchema.parse(req.body);

  const validBody = {
    username: validatedBody.username,
    password: await hashPassword(validatedBody.password, 10),
    role: validatedBody.role,
  };

  const response = await userServices.signupUser(validBody);

  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT Present");
  }

  const token = jwt.sign(
    { user_id: response.user_id, username: response.username },
    process.env.JWT_SECRET
  );

  res.status(200).json(response);
};

export const hashPassword = async (password: string, saltrounds: number) => {
  const salt = await bcrypt.genSalt(saltrounds);

  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

// export const userLogin = async(req:Request,res:Response)=>{
//     const validatedBody =
// }
