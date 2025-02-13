import { TProductionOrder } from "@/types/productionOrder";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

type ProductionOrderProps = {
  productionOrder: TProductionOrder;
  costEstimateProductionOrder: number;
  actions?: React.ReactNode;
};

export default function ProductionOrder({
  productionOrder,
  costEstimateProductionOrder,
  actions,
}: ProductionOrderProps) {
  const productPrice = productionOrder.product?.price ?? 0;
  const profit =
    productPrice * productionOrder.quantity - costEstimateProductionOrder;

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <div className="flex items-center flex-wrap gap-2">
              {productionOrder.status && (
                <Chip>
                  Статус:{" "}
                  <span className="font-bold">
                    {productionOrder.status?.name}
                  </span>
                </Chip>
              )}
              <Chip color="primary">
                Колличество:{" "}
                <span className="font-bold">{productionOrder.quantity}</span>
              </Chip>
              {productionOrder.product && (
                <p className="font-bold">{productionOrder.product.name}</p>
              )}
            </div>
            {actions}
          </div>
          <p>
            Оценка себестоимости производственного заказа:{" "}
            <span className="font-bold">
              {formatPrice(costEstimateProductionOrder)}
            </span>
          </p>
          <p>
            Чистая прибыль исходя из стоимости продукта составляет:{" "}
            <span className="font-bold">{formatPrice(profit)}</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
