import { getCostEstimateProduct } from "@/actions/product";
import { getProductionOrder } from "@/actions/productionOrder";
import { auth } from "@/auth";
import ProductionOrderActions from "@/components/entities/ProductionOrderActions";
import ProductionOrder from "@/components/pages/ProductionOrder";
import { notFound, redirect } from "next/navigation";

export default async function ProductionOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const isAdmin = session?.user.role === "ADMIN";
  const isManager = session?.user.role === "MANAGER";

  if (!isAdmin && !isManager) {
    redirect("/");
  }

  const { id } = await params;

  const { data: productionOrder, message: productionOrderMessage } =
    await getProductionOrder(id);

  if (!productionOrder || productionOrderMessage) {
    return notFound();
  }

  const { data: costEstimateProduct, message: costEstimateProductMessage } =
    await getCostEstimateProduct(productionOrder.productId);

  if (costEstimateProduct == null || costEstimateProductMessage) {
    return notFound();
  }

  return (
    <ProductionOrder
      productionOrder={productionOrder}
      costEstimateProduct={costEstimateProduct}
      actions={
        session.user.role === "ADMIN" && (
          <ProductionOrderActions productionOrder={productionOrder} />
        )
      }
    />
  );
}
