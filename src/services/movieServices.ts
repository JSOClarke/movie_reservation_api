import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createMovie = async () => {
  const movie = await prisma.movies.create({
    data: {
      title: "Inception",
      description: "Mind-bending thriller",
      genre: "Sci-Fi",
    },
  });

  return movie;
};
