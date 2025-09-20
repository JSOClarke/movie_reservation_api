import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const gatherShowings = async () => {
  const response = await prisma.showings.findMany();
  return response;
};
