import { getMaterials } from "@/actions/material";
import { auth } from "@/auth";
import Materials from "@/components/pages/Materials";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}) {
  const { page = "1", limit = "20", query = "" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const { data, message } = await getMaterials(parsedLimit, pageToSkip, query);

  if (!data || message) {
    return notFound();
  }

  const [materials, total] = data;

  return <Materials materials={materials} total={total} limit={parsedLimit} />;
}
