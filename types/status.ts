import { TProductionOrder } from "./production-order";

export type TStatus = {
  id: string;
  name: string;
  productionOrders?: TProductionOrder[];
};
