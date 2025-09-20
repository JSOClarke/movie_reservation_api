import { z } from "zod";

export type getMoviesInput = z.infer<typeof getMoviesSchema>;

export const getMoviesSchema = z
  .object({
    title: z.string().min(1).max(100),
    description: z.string(),
    poster: z.string().min(5).max(255),
    genre: z.string().min(1).max(100), // possible change this to an enum
  })
  .strict();
