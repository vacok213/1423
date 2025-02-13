import { TProductMaterial } from "./productMaterial";
import { TProductionOrder } from "./productionOrder";

export type TProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  materials?: TProductMaterial[];
  productionOrders?: TProductionOrder[];
};
