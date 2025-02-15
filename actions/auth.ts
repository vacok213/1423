"use server";

import { signIn } from "@/auth";

export async function signInWith(provider: string) {
  await signIn(provider, { redirectTo: "/" });
}

export async function signOut() {
  await signOut();
}
