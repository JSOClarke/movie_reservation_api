import { z } from "zod";

export type addMovieInput = z.infer<typeof addMovieSchema>;
export type removeMovieInput = z.infer<typeof removeMovieSchema>;
export type addShowingInput = z.infer<typeof addShowingSchema>;

export const addMovieSchema = z
  .object({
    title: z.string().min(1).max(100),
    description: z.string(),
    poster: z.string().min(5).max(255),
    genre: z.string().min(1).max(100), // possible change this to an enum
  })
  .strict();

export const removeMovieSchema = z.preprocess(
  (val) => Number(val),
  z.number().int().positive()
);

export const addShowingSchema = z
  .object({
    movie_id: z.number().min(1).max(100),
    start_time: z.coerce.date(), // coerces from string → Date
    end_time: z.coerce.date(),
    price: z.number().positive(),
    screen_id: z.number().int().positive(),
    seating_curr_capacity: z.number().int().positive(),
  })
  .refine((data) => data.start_time < data.end_time, {
    message: "end_time must be after start_time",
    path: ["end_time"],
  });
