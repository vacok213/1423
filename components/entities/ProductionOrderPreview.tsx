import { TProductionOrder } from "@/types/productionOrder";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";

type ProductionOrderPreviewProps = {
  productionOrder: TProductionOrder;
};

export default function ProductionOrderPreview({
  productionOrder,
}: ProductionOrderPreviewProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center flex-wrap gap-2">
          {productionOrder.status && (
            <Chip>
              Статус:{" "}
              <span className="font-bold">{productionOrder.status?.name}</span>
            </Chip>
          )}
          <Chip color="primary">
            Колличество:{" "}
            <span className="font-bold">{productionOrder.quantity}</span>
          </Chip>
          {productionOrder.product && (
            <Link
              href={`/production-orders/${productionOrder.id}`}
              className="font-bold"
            >
              {productionOrder.product.name}
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
