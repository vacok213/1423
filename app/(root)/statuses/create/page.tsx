import { auth } from "@/auth";
import CreateStatus from "@/components/pages/CreateStatus";
import { redirect } from "next/navigation";

export default async function CreateStatusPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <CreateStatus />;
}
