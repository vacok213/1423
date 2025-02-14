import { TProductionOrder } from "@/types/productionOrder";
import formatPrice from "@/utils/formatPrice";
import { Card, CardBody } from "@heroui/card";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

type ProductionOrderProps = {
  productionOrder: TProductionOrder;
  costEstimateProduct: number;
  actions?: React.ReactNode;
};

export default function ProductionOrder({
  productionOrder,
  costEstimateProduct,
  actions,
}: ProductionOrderProps) {
  const productPrice = productionOrder.product?.price ?? 0;
  const costEstimateProductionOrder =
    costEstimateProduct * productionOrder.quantity;
  const profit =
    productPrice * productionOrder.quantity - costEstimateProductionOrder;

  return (
    <div className="space-y-4">
      <Card>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              {productionOrder.product && (
                <h2 className="text-xl font-bold">
                  {productionOrder.product.name}
                </h2>
              )}
              {actions}
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2">
        {productionOrder.status && (
          <Card>
            <CardBody>
              <p>Статус:</p>
              <h2 className="text-xl font-bold">
                {productionOrder.status.name}
              </h2>
            </CardBody>
          </Card>
        )}
        <Card>
          <CardBody>
            <p>Колличество:</p>
            <h2 className="text-xl font-bold">{productionOrder.quantity}</h2>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p>Дата создания:</p>
            <h2 className="text-xl font-bold">
              {formatDistance(new Date(productionOrder.createdAt), new Date(), {
                locale: ru,
                addSuffix: true,
              })}
            </h2>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p>Оценка себестоимости:</p>
            <h2 className="text-xl font-bold">
              {formatPrice(costEstimateProductionOrder)}
            </h2>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p>Чистая прибыль:</p>
            <div className="flex flex-wrap gap-2 items-center">
              {profit > 0 ? (
                <FaCaretUp size={22} className="text-green-500" />
              ) : (
                <FaCaretDown size={22} className="text-red-500" />
              )}
              <h2 className="text-xl font-bold">{formatPrice(profit)}</h2>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
