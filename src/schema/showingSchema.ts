import { z } from "zod";

export type showingSeatsSchemaInput = z.infer<typeof showingSeatsSchema>;

export const showingSeatsSchema = z.preprocess(
  (val) => Number(val),
  z.number().int().positive()
);
