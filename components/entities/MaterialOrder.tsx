import { TMaterialOrder } from "@/types/materialOrder";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

type TMaterialOrderProps = {
  materialOrder: TMaterialOrder;
  actions?: React.ReactNode;
};

export default function MaterialOrder({
  materialOrder,
  actions,
}: TMaterialOrderProps) {
  const orderAmount = materialOrder.material
    ? materialOrder.material.cost * materialOrder.quantity
    : 0;

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <div className="flex gap-2 flex-wrap items-center">
              <Chip color="primary">
                Количество:{" "}
                <span className="font-bold">{materialOrder.quantity}</span>
              </Chip>
              {materialOrder.material && (
                <h2 className="font-bold text-lg">
                  {materialOrder.material.name}
                </h2>
              )}
            </div>
            <p className="font-bold">{formatPrice(orderAmount)}</p>
          </div>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
