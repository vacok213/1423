import { TPaginate } from "@/types/paginate";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import ProductionOrderPreview from "../entities/ProductionOrderPreview";
import { TProductionOrder } from "@/types/productionOrder";

type TProductionOrdersProps = TPaginate & {
  productionOrders: TProductionOrder[];
};

export default function ProductionOrders({
  productionOrders,
  total,
  limit,
}: TProductionOrdersProps) {
  return (
    <div className="space-y-4">
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
