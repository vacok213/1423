import { getProductMaterial } from "@/actions/productMaterial";
import { getProducts } from "@/actions/product";
import { getMaterials } from "@/actions/material";
import { notFound } from "next/navigation";
import EditProductMaterial from "@/components/pages/EditProductMaterial";

export default async function EditProductMaterialPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const productMaterialReq = getProductMaterial(id);
  const productsReq = getProducts(9999999999999, 0);
  const materialsReq = getMaterials(9999999999999, 0);

  const [productMaterialResponse, productsRes, materialsRes] =
    await Promise.all([productMaterialReq, productsReq, materialsReq]);

  const { data: productMaterial, message: productMaterialMessage } =
    productMaterialResponse;
  const { data: productsData, message: productsMessage } = productsRes;
  const { data: materialsData, message: materialsMessage } = materialsRes;

  if (
    !productMaterial ||
    !productsData ||
    !materialsData ||
    productMaterialMessage ||
    productsMessage ||
    materialsMessage
  ) {
    return notFound();
  }

  const [products] = productsData;
  const [materials] = materialsData;

  return (
    <EditProductMaterial
      productMaterial={productMaterial}
      products={products}
      materials={materials}
    />
  );
}
