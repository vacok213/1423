import { TProductionOrder } from "./productionOrder";

export type TStatus = {
  id: string;
  name: string;
  productionOrders?: TProductionOrder[];
};
