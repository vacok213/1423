import { TMaterial } from "@/types/material";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

type TMaterialProps = {
  material: TMaterial;
  actions: React.ReactNode;
};

export default function Material({ material, actions }: TMaterialProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <div className="flex gap-2 flex-wrap items-center">
              <Chip color="primary">
                Колличество:{" "}
                <span className="font-bold">{material.quantityInStock}</span>
              </Chip>
              <h2 className="font-bold text-lg">{material.name}</h2>
            </div>
            <p>
              <span className="font-bold">{formatPrice(material.cost)}</span> за{" "}
              <span className="font-bold">{material.unit}</span>
            </p>
          </div>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
