import { getProducts } from "@/actions/product";
import { getProductionOrder } from "@/actions/productionOrder";
import { getStatuses } from "@/actions/status";
import { auth } from "@/auth";
import EditProductionOrder from "@/components/pages/EditProductionOrder";
import { notFound, redirect } from "next/navigation";

export default async function EditProductionOrderPage({
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

  const [productsResponse, statusesResponse, productionOrderResponse] =
    await Promise.all([getProducts(), getStatuses(), getProductionOrder(id)]);

  const { data: productsData, message: productsMessage } = productsResponse;
  const { data: statusesData, message: statusesMessage } = statusesResponse;
  const { data: productionOrder, message: productionOrderMessage } =
    productionOrderResponse;

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

  return (
    <EditProductionOrder
      statuses={statuses}
      products={products}
      productionOrder={productionOrder}
    />
  );
}
