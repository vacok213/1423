import { auth } from "@/auth";
import CreateMaterialOrder from "@/components/pages/CreateMaterialOrder";
import { notFound, redirect } from "next/navigation";
import { getMaterials } from "@/actions/material";

export default async function CreateMaterialOrderPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { data: materialsData, message: productsMessage } =
    await getMaterials();

  if (!materialsData || productsMessage) {
    return notFound();
  }

  const [materials] = materialsData;

  return <CreateMaterialOrder materials={materials} />;
}
