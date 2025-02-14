import { getProduct } from "@/actions/product";
import { auth } from "@/auth";
import EditProduct from "@/components/pages/EditProduct";
import { notFound, redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const { data: product, message } = await getProduct(id);

  if (!product || message) {
    return notFound();
  }

  return <EditProduct product={product} />;
}
