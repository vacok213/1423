import { TMaterial } from "./material";
import { TProduct } from "./product";

export type TProductMaterial = {
  id: string;
  productId: string;
  materialId: string;
  quantity: number;
  product?: TProduct;
  material?: TMaterial;
};
