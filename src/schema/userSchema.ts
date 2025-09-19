import { z } from "zod";

export type UserInputSignUp = z.infer<typeof userSchema>;
export type UserInputLogin = z.infer<typeof userLoginSchema>;

const userUsername = z.string().min(1).max(100);
const userPassword = z.string().min(8).max(50);

export const userSchema = z
  .object({
    username: userUsername,
    password: userPassword,
    role: z.enum(["user", "admin"]),
  })
  .strict();

export const userLoginSchema = z
  .object({
    username: userUsername,
    password: userPassword,
  })
  .strict();
