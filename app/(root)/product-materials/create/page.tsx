import { getProducts } from "@/actions/product";
import { getMaterials } from "@/actions/material";
import CreateProductMaterial from "@/components/pages/CreateProductMaterial";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreateProductMaterialPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { data: productsData, message: productsMessage } = await getProducts(
    9999999999999,
    0,
  );
  const { data: materialsData, message: materialsMessage } = await getMaterials(
    9999999999999,
    0,
  );

  if (!productsData || !materialsData || productsMessage || materialsMessage) {
    return notFound();
  }

  const [products] = productsData;
  const [materials] = materialsData;

  return <CreateProductMaterial products={products} materials={materials} />;
}
