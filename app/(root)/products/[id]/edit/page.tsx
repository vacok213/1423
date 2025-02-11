import { getProduct } from "@/actions/product";
import EditProduct from "@/components/pages/EditProduct";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, message } = await getProduct(id);

  if (!product || message) {
    return notFound();
  }

  return <EditProduct product={product} />;
}
