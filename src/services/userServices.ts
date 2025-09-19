import { PrismaClient } from "../generated/prisma";
import {
  type UserInputLogin,
  type UserInputSignUp,
} from "../schema/userSchema.js";
const prisma = new PrismaClient();

export const signupUser = async ({
  username,
  password,
  role,
}: UserInputSignUp) => {
  const user = prisma.users.create({
    data: {
      username: username,
      password_hash: password,
      role: role,
    },
    select: {
      user_id: true,
      username: true,
    },
  });
  return user;
};

export const loginUser = async (username: string) => {
  const user = prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};
