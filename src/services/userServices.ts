import { PrismaClient } from "../generated/prisma";
import { type UserInput } from "../schema/userSchema.js";
const prisma = new PrismaClient();

export const signupUser = async ({ username, password, role }: UserInput) => {
  const user = prisma.users.create({
    data: {
      username: username,
      password_hash: password,
      role: role,
    },
    select: {
      user_id: true,
      role: true,
    },
  });
  return user;
};
