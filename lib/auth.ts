"use server";

import { signIn, signOut } from "@/auth";

export async function logIn() {
  await signIn("github", { redirectTo: "/" });
}

export async function logOut() {
  await signOut({ redirectTo: "/auth/signin" });
}
