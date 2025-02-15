import MaterialOrders from "@/components/pages/MaterialOrders";
import { getMaterialOrders } from "@/actions/materialOrder";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function MaterialOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { page = "1", limit = "20", query = "" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const { data, message } = await getMaterialOrders(
    parsedLimit,
    pageToSkip,
    query,
  );

  if (!data || message) {
    return notFound();
  }

  const [materialOrders, total] = data;

  return (
    <MaterialOrders
      materialOrders={materialOrders}
      total={total}
      limit={parsedLimit}
    />
  );
}
