import { TMaterialOrder } from "./materialOrder";
import { TProductMaterial } from "./productMaterial";

export type TMaterial = {
  id: string;
  name: string;
  cost: number;
  unit: string;
  quantityInStock: number;
  createdAt: Date;
  updatedAt: Date;
  products?: TProductMaterial[];
  materialOrders?: TMaterialOrder[];
};
