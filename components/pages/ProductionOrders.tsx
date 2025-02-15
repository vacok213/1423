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
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

type TProductionOrdersProps = TPaginate & {
  productionOrders: TProductionOrder[];
  products: TProduct[];
  statuses: TStatus[];
  currentMonthCount: number;
  previousMonthCount: number;
};

export default function ProductionOrders({
  productionOrders,
  total,
  limit,
  products,
  statuses,
  currentMonthCount,
  previousMonthCount,
}: TProductionOrdersProps) {
  const productsToItems = products.map((product) => ({
    id: product.id,
    label: product.name,
  }));

  const statusesToItems = statuses.map((status) => ({
    id: status.id,
    label: status.name,
  }));

  const difference = currentMonthCount - previousMonthCount;
  const isMoreThanPreviousMonth = difference > 0;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2">
        <Popover backdrop="blur">
          <PopoverTrigger>
            <Card className="cursor-pointer">
              <CardBody>
                <p>Колличество заказов в этом месяце:</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {difference > 0 ? (
                    <FaCaretUp size={22} className="text-green-500" />
                  ) : (
                    <FaCaretDown size={22} className="text-red-500" />
                  )}
                  <h2 className="text-xl font-bold">{currentMonthCount}</h2>
                </div>
              </CardBody>
            </Card>
          </PopoverTrigger>
          <PopoverContent>
            {difference > 0 ? (
              <p>
                Больше на <span className="font-bold">{difference}</span> по
                сравнению с предыдущем месяцем
              </p>
            ) : (
              <p>
                Меньше на{" "}
                <span className="font-bold">{Math.abs(difference)}</span> по
                сравнению с предыдущем месяцем
              </p>
            )}
          </PopoverContent>
        </Popover>
        <Card>
          <CardBody>
            <p>Колличество заказов за все время:</p>
            <h2 className="text-xl font-bold">{total}</h2>
          </CardBody>
        </Card>
      </div>
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
