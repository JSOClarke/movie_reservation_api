import { z } from "zod";

export type CreateBookingSchemaInput = z.infer<typeof createBookingSchema>;

export const createBookingSchema = z
  .object({
    show_id: z.number().int().positive(),
    seat_id: z.number().int().positive(),
  })
  .strict();
