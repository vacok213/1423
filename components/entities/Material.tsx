import { TMaterial } from "@/types/material";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";

type TMaterialProps = {
  material: TMaterial;
};

export default function Material({ material }: TMaterialProps) {
  return (
    <Card>
      <CardBody>
        <h2 className="font-bold text-lg">{material.name}</h2>
        <p className="font-bold">
          {formatPrice(material.cost)} за {material.unit}
        </p>
      </CardBody>
    </Card>
  );
}
