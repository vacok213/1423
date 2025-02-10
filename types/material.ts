import { TProductMaterial } from "./product-material";

export type TMaterial = {
  id: string;
  name: string;
  cost: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
  products?: TProductMaterial[];
};
