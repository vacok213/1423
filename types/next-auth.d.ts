import NextAuth, { type DefaultSession } from "next-auth";
import { TRole } from "./role";

declare module "next-auth" {
  interface Session {
    user: {
      role?: TRole;
    } & DefaultSession["user"];
  }
}
