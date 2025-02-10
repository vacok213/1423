import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [Github],
});
