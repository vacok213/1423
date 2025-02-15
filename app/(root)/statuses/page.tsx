import { getStatuses } from "@/actions/status";
import { auth } from "@/auth";
import Statuses from "@/components/pages/Statuses";
import { notFound, redirect } from "next/navigation";

export const revalidate = 0;

export default async function StatusesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    query?: string;
  }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { page = "1", limit = "20", query = "" } = await searchParams;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const pageToSkip = (parsedPage - 1) * parsedLimit;

  const { data, message } = await getStatuses(parsedLimit, pageToSkip, query);

  if (!data || message) {
    return notFound();
  }

  const [statuses, total] = data;

  return <Statuses statuses={statuses} total={total} limit={parsedLimit} />;
}
