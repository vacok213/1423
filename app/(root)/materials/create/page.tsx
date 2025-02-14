import { auth } from "@/auth";
import CreateMaterial from "@/components/pages/CreateMaterial";
import { redirect } from "next/navigation";

export default async function CreateMaterialPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <CreateMaterial />;
}
