import { TProductMaterial } from "@/types/productMaterial";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

type TProductMaterialProps = {
  productMaterial: TProductMaterial;
  actions?: React.ReactNode;
};

export default function ProductMaterial({
  productMaterial,
  actions,
}: TProductMaterialProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2">
            <Chip color="primary">
              Количество:{" "}
              <span className="font-bold">{productMaterial.quantity}</span>
            </Chip>
            <p>
              <span className="font-bold">
                {productMaterial.product && productMaterial.product.name}
              </span>{" "}
              состоит из{" "}
              <span className="font-bold">
                {productMaterial.material && productMaterial.material.name}
              </span>
            </p>
          </div>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
