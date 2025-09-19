import { z } from "zod";

export type UserInput = z.infer<typeof userSchema>;

export const userSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(8).max(50),
  role: z.enum(["user", "admin"]),
});
