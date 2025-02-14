import CreateProductionOrder from "@/components/pages/CreateProductionOrder";
import { getProducts } from "@/actions/product";
import { getStatuses } from "@/actions/status";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreateProductionOrderPage() {
  const session = await auth();

  const isAdmin = session?.user.role === "ADMIN";
  const isManager = session?.user.role === "MANAGER";

  if (!isAdmin && !isManager) {
    redirect("/");
  }

  const [productsRes, statusesRes] = await Promise.all([
    getProducts(),
    getStatuses(),
  ]);

  const { data: productsData, message: productsMessage } = productsRes;
  const { data: statusesData, message: statusesMessage } = statusesRes;

  if (!productsData || !statusesData || productsMessage || statusesMessage) {
    return notFound();
  }

  const [products] = productsData;
  const [statuses] = statusesData;

  return <CreateProductionOrder products={products} statuses={statuses} />;
}
