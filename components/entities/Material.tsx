import { TMaterial } from "@/types/material";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";

type TMaterialProps = {
  material: TMaterial;
  actions: React.ReactNode;
};

export default function Material({ material, actions }: TMaterialProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-4">
          <div>
            <h2 className="font-bold text-lg">{material.name}</h2>
            <p className="font-bold">
              {formatPrice(material.cost)} за {material.unit}
            </p>
          </div>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
