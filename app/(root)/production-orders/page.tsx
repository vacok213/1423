import { getProductionOrders } from "@/actions/productionOrder";
import { getProducts } from "@/actions/product";
import { getStatuses } from "@/actions/status";
import { getProductionOrdersCountInRange } from "@/actions/productionOrder"; // Обновленный метод
import { auth } from "@/auth";
import ProductionOrders from "@/components/pages/ProductionOrders";
import { notFound, redirect } from "next/navigation";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export default async function ProductionOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    productId?: string;
    statusId?: string;
  }>;
}) {
  const session = await auth();

  const isAdmin = session?.user.role === "ADMIN";
  const isManager = session?.user.role === "MANAGER";

  if (!isAdmin && !isManager) {
    redirect("/");
  }

  const {
    page = "1",
    limit = "20",
    productId = "",
    statusId = "",
  } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const currentDate = new Date();

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(currentDate, 1));

  const [
    productionOrdersResponse,
    productsResponse,
    statusesResponse,
    currentMonthCountResponse,
    previousMonthCountResponse,
  ] = await Promise.all([
    getProductionOrders(parsedLimit, pageToSkip, productId, statusId),
    getProducts(),
    getStatuses(),
    getProductionOrdersCountInRange(startOfCurrentMonth, endOfCurrentMonth),
    getProductionOrdersCountInRange(startOfPreviousMonth, endOfPreviousMonth),
  ]);

  const { data: productionOrdersData, message: productionOrdersMessage } =
    productionOrdersResponse;
  const { data: productsData, message: productsMessage } = productsResponse;
  const { data: statusesData, message: statusesMessage } = statusesResponse;
  const { data: currentMonthCount, message: currentMonthCountMessage } =
    currentMonthCountResponse;
  const { data: previousMonthCount, message: previousMonthCountMessage } =
    previousMonthCountResponse;

  if (
    !productionOrdersData ||
    productionOrdersMessage ||
    !productsData ||
    productsMessage ||
    !statusesData ||
    statusesMessage ||
    currentMonthCount == null ||
    currentMonthCountMessage ||
    previousMonthCount == null ||
    previousMonthCountMessage
  ) {
    return notFound();
  }

  const [productionOrders, total] = productionOrdersData;
  const [products] = productsData;
  const [statuses] = statusesData;

  return (
    <ProductionOrders
      productionOrders={productionOrders}
      products={products}
      statuses={statuses}
      total={total}
      limit={parsedLimit}
      currentMonthCount={currentMonthCount}
      previousMonthCount={previousMonthCount}
    />
  );
}
