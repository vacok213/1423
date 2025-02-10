import { z } from "zod";

export const materialSchema = z.object({
  name: z.string().min(2),
  unit: z.string().min(1),
  cost: z.number().min(1),
});
