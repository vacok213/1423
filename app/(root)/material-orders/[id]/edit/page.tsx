import { auth } from "@/auth";
import EditMaterialOrder from "@/components/pages/EditMaterialOrder";
import { getMaterialOrder } from "@/actions/materialOrder";
import { notFound, redirect } from "next/navigation";
import { getMaterials } from "@/actions/material";

export default async function EditMaterialOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const [materialOrderResponse, materialsResponse] = await Promise.all([
    getMaterialOrder(params.id),
    getMaterials(),
  ]);

  const { data: materialOrder, message: materialOrderMessage } =
    materialOrderResponse;
  const { data: materialsData, message: materialsMessage } = materialsResponse;

  if (
    !materialOrder ||
    materialOrderMessage ||
    !materialsData ||
    materialsMessage
  ) {
    return notFound();
  }

  const [products] = materialsData;

  return (
    <EditMaterialOrder materialOrder={materialOrder} materials={products} />
  );
}
