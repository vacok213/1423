import { auth } from "@/auth";
import Login from "@/components/pages/Login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <Login />;
}
