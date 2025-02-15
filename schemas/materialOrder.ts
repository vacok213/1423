import { z } from "@/ru-zod";

export const materialOrderSchema = z.object({
  materialId: z.string().min(1),
  quantity: z.number().min(0),
  completedAt: z.string().optional(),
});
