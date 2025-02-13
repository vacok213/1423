import {
  getCostEstimateProductionOrder,
  getProductionOrder,
} from "@/actions/productionOrder";
import ProductionOrderActions from "@/components/entities/ProductionOrderActions";
import ProductionOrder from "@/components/pages/ProductionOrder";
import { notFound } from "next/navigation";

export default async function ProductionOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: productionOrder, message: productionOrderMessage } =
    await getProductionOrder(id);

  if (!productionOrder || productionOrderMessage) {
    return notFound();
  }

  const {
    data: costEstimateProductionOrder,
    message: costEstimateProductionOrderMessage,
  } = await getCostEstimateProductionOrder(productionOrder.productId);

  if (
    costEstimateProductionOrder == null ||
    costEstimateProductionOrderMessage
  ) {
    return notFound();
  }

  return (
    <ProductionOrder
      productionOrder={productionOrder}
      costEstimateProductionOrder={costEstimateProductionOrder}
      actions={<ProductionOrderActions productionOrder={productionOrder} />}
    />
  );
}
