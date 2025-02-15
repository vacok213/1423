import { z } from "@/ru-zod";

export const statusSchema = z.object({
  name: z.string().min(2),
});
