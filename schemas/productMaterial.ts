import { z } from "@/ru-zod";

export const productMaterialSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  materialId: z.string().min(1, "Material ID is required"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
});
