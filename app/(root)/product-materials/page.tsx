import { getMaterials } from "@/actions/material";
import { getProducts } from "@/actions/product";
import { getProductMaterials } from "@/actions/productMaterial";
import { auth } from "@/auth";
import ProductMaterials from "@/components/pages/ProductMaterials";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

export default async function ProductMaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    productId?: string;
    materialId?: string;
  }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const {
    page = "1",
    limit = "20",
    productId = "",
    materialId = "",
  } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const [productMaterialsResponse, productsResponse, materialsResponse] =
    await Promise.all([
      getProductMaterials(parsedLimit, pageToSkip, productId, materialId),
      getProducts(),
      getMaterials(),
    ]);

  const { data: productMaterialsData, message: productMaterialsMessage } =
    productMaterialsResponse;
  const { data: productsData, message: productsMessage } = productsResponse;
  const { data: materialsData, message: materialsMessage } = materialsResponse;

  if (
    !productMaterialsData ||
    productMaterialsMessage ||
    !productsData ||
    productsMessage ||
    !materialsData ||
    materialsMessage
  ) {
    return notFound();
  }

  const [productMaterials, total] = productMaterialsData;
  const [products] = productsData;
  const [materials] = materialsData;

  return (
    <ProductMaterials
      productMaterials={productMaterials}
      products={products}
      materials={materials}
      total={total}
      limit={parsedLimit}
    />
  );
}
