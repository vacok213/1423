import { getStatus } from "@/actions/status";
import { auth } from "@/auth";
import EditStatus from "@/components/pages/EditStatus";
import { notFound, redirect } from "next/navigation";

export default async function EditStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const { data: status, message } = await getStatus(id);

  if (!status || message) {
    return notFound();
  }

  return <EditStatus status={status} />;
}
