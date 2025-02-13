import Products from "@/components/pages/Products";
import { getProducts } from "@/actions/product";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductsPage({
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

  const { data, message } = await getProducts(parsedLimit, pageToSkip);

  if (!data || message) {
    return notFound();
  }

  const [products, total] = data;

  return <Products products={products} total={total} limit={parsedLimit} />;
}
