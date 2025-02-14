import Products from "@/components/pages/Products";
import { getProducts } from "@/actions/product";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function ProductsPage({
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

  const { data, message } = await getProducts(parsedLimit, pageToSkip, query);

  if (!data || message) {
    return notFound();
  }

  const [products, total] = data;

  return <Products products={products} total={total} limit={parsedLimit} />;
}
