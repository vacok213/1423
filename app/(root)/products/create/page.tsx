import { auth } from "@/auth";
import CreateProduct from "@/components/pages/CreateProduct";
import { redirect } from "next/navigation";

export default async function CreateProductPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <CreateProduct />;
}
