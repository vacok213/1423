import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(1),
});
