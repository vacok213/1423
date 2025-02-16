import { TPaginate } from "@/types/paginate";
import MaterialOrder from "../entities/MaterialOrder";
import Paginate from "../widgets/Paginate";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { TMaterialOrder } from "@/types/materialOrder";
import Search from "../widgets/Search";
import { Card, CardBody } from "@heroui/card";
import MaterialOrderActions from "../entities/MaterialOrderActions";
import { auth } from "@/auth";

type TMaterialOrdersProps = TPaginate & {
  materialOrders: TMaterialOrder[];
};

export default async function MaterialOrders({
  materialOrders,
  total,
  limit,
}: TMaterialOrdersProps) {
  const session = await auth();

  return (
    <div className="space-y-4">
      <Card isBlurred className="sticky top-40 z-30">
        <CardBody>
          <div className="space-y-4">
            <Search param="query" label="Поиск" />
          </div>
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <Button color="primary" as={Link} href="/material-orders/create">
          Создать
        </Button>
      </div>
      {materialOrders.map((materialOrder) => (
        <MaterialOrder
          key={materialOrder.id}
          materialOrder={materialOrder}
          actions={
            session?.user.role === "ADMIN" && (
              <MaterialOrderActions materialOrder={materialOrder} />
            )
          }
        />
      ))}
      <Paginate total={total} limit={limit} />
    </div>
  );
}
