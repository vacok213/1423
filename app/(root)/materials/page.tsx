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

  const { data, message } = await getMaterials(limit, pageToSkip);

  if (!data || message) {
    return notFound();
  }

  const [materials, total] = data;

  return <Materials materials={materials} total={total} limit={limit} />;
}
