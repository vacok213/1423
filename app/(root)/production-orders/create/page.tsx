import CreateProductionOrder from "@/components/pages/CreateProductionOrder";
import { getProducts } from "@/actions/product";
import { getStatuses } from "@/actions/status";
import { notFound } from "next/navigation";

export default async function CreateProductionOrderPage() {
  const productsReq = getProducts(9999999999999, 0);
  const statusesReq = getStatuses(9999999999999, 0);

  const [productsRes, statusesRes] = await Promise.all([
    productsReq,
    statusesReq,
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
