import Products from "@/components/pages/Products";
import { getProducts } from "@/actions/product";
import { TProduct } from "@/types/product";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
  }>;
}) {
  const { page = 1, limit = 20 } = await searchParams;
  const pageToSkip = (page - 1) * limit;

  const { data, message } = await getProducts(limit, pageToSkip);

  if (!data || message) {
    return notFound();
  }

  const [products, total] = data;

  return (
    <Products products={products as TProduct[]} total={total} limit={limit} />
  );
}
