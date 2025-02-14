import { TPaginate } from "@/types/paginate";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import ProductionOrderPreview from "../entities/ProductionOrderPreview";
import { TProductionOrder } from "@/types/productionOrder";
import SelectSearch from "../widgets/SelectSearch";
import { TProduct } from "@/types/product";
import { TStatus } from "@/types/status";
import { Card, CardBody } from "@heroui/card";

type TProductionOrdersProps = TPaginate & {
  productionOrders: TProductionOrder[];
  products: TProduct[];
  statuses: TStatus[];
};

export default function ProductionOrders({
  productionOrders,
  total,
  limit,
  products,
  statuses,
}: TProductionOrdersProps) {
  const productsToItems = products.map((product) => ({
    id: product.id,
    label: product.name,
  }));

  const statusesToItems = statuses.map((status) => ({
    id: status.id,
    label: status.name,
  }));

  return (
    <div className="space-y-4">
      <Card isBlurred className="sticky top-40 z-30">
        <CardBody>
          <div className="space-y-4">
            <SelectSearch
              param="productId"
              items={productsToItems}
              label="Выберете продукт"
            />
            <SelectSearch
              param="statusId"
              items={statusesToItems}
              label="Выберете статус"
            />
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <Button color="primary" as={Link} href="/production-orders/create">
          Создать
        </Button>
      </div>
      {productionOrders.map((productionOrder) => (
        <ProductionOrderPreview
          key={productionOrder.id}
          productionOrder={productionOrder}
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
