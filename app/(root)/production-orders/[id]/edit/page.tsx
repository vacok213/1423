import { getProducts } from "@/actions/product";
import { getProductionOrder } from "@/actions/productionOrder";
import { getStatuses } from "@/actions/status";
import EditProductionOrder from "@/components/pages/EditProductionOrder";
import { notFound } from "next/navigation";

export default async function EditProductionOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: productsData, message: productsMessage } = await getProducts(
    9999999999999,
    0,
  );
  const { data: statusesData, message: statusesMessage } = await getStatuses(
    9999999999999,
    0,
  );

  const { data: productionOrder, message: productionOrderMessage } =
    await getProductionOrder(id);

  if (
    !productsData ||
    !statusesData ||
    !productionOrder ||
    productionOrderMessage ||
    statusesMessage ||
    productsMessage
  ) {
    return notFound();
  }

  const [products] = productsData;
  const [statuses] = statusesData;

  if (!productionOrder || productionOrderMessage) {
    return notFound();
  }

  return (
    <EditProductionOrder
      statuses={statuses}
      products={products}
      productionOrder={productionOrder}
    />
  );
}
