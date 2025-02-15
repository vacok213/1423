import { TMaterial } from "./material";

export interface TMaterialOrder {
  id: string;
  materialId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  material?: TMaterial;
}
