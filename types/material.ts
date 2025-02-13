import { TProductMaterial } from "./productMaterial";

export type TMaterial = {
  id: string;
  name: string;
  cost: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
  products?: TProductMaterial[];
};
