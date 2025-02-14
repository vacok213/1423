import { getMaterial } from "@/actions/material";
import { auth } from "@/auth";
import EditMaterial from "@/components/pages/EditMaterial";
import { notFound, redirect } from "next/navigation";

export default async function EditMaterialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const { data: material, message } = await getMaterial(id);

  if (!material || message) {
    return notFound();
  }

  return <EditMaterial material={material} />;
}
