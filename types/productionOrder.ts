import { TProduct } from "./product";
import { TStatus } from "./status";

export type TProductionOrder = {
  id: string;
  productId: string;
  quantity: number;
  statusId: string;
  createdAt: Date;
  updatedAt: Date;
  product?: TProduct;
  status?: TStatus;
};
