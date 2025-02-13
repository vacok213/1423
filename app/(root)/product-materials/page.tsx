import { getProductMaterials } from "@/actions/productMaterial";
import ProductMaterials from "@/components/pages/ProductMaterials";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductMaterialsPage({
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

  const { data, message } = await getProductMaterials(parsedLimit, pageToSkip);

  if (!data || message) {
    return notFound();
  }

  const [productMaterials, total] = data;

  return (
    <ProductMaterials
      productMaterials={productMaterials}
      total={total}
      limit={parsedLimit}
    />
  );
}
