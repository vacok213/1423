import { getMaterial } from "@/actions/material";
import EditMaterial from "@/components/pages/EditMaterial";
import { notFound } from "next/navigation";

export default async function EditMaterialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: material, message } = await getMaterial(id);

  if (!material || message) {
    return notFound();
  }

  return <EditMaterial material={material} />;
}
