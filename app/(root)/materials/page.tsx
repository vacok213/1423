import { getMaterials } from "@/actions/material";
import Materials from "@/components/pages/Materials";
import { TMaterial } from "@/types/material";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
  }>;
}) {
  const { page = 1, limit = 20 } = await searchParams;
  const pageToSkip = (page - 1) * limit;

  const res = await getMaterials(limit, pageToSkip);

  if (!res.data || res.error) {
    return notFound();
  }

  const [materials, total] = res.data;

  return (
    <Materials
      materials={materials as TMaterial[]}
      total={total}
      limit={limit}
    />
  );
}
