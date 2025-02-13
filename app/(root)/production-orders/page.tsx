import { getProductionOrders } from "@/actions/productionOrder";
import ProductionOrders from "@/components/pages/ProductionOrders";
import { notFound } from "next/navigation";

export default async function ProductionOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const { page = "1", limit = "20" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const { data, message } = await getProductionOrders(parsedLimit, pageToSkip);

  if (!data || message) {
    return notFound();
  }

  const [productionOrders, total] = data;

  return (
    <ProductionOrders
      productionOrders={productionOrders}
      total={total}
      limit={parsedLimit}
    />
  );
}
