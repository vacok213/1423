import { TProductMaterial } from "./product-material";
import { TProductionOrder } from "./production-order";

export type TProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  materials?: TProductMaterial[];
  productionOrders?: TProductionOrder[];
};
