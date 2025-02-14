import { z } from "@/ru-zod";

export const productionOrderSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1),
  statusId: z.string().min(1),
});
