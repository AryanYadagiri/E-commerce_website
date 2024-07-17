import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserRole } from "@prisma/client";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = bcrypt.compareSync(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        if (user.role === UserRole.SELLER) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            sessionId: null,
          };
        } else if (user.role === UserRole.REGULAR) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            sessionId: null,
          };
        } else {
          throw new Error("Invalid user role");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (session) {
        const sessionToken = crypto.randomBytes(32).toString("hex");

        const session = await prisma.session.create({
          data: {
            userId: Number(user.id),
            sessionToken,
            expires: new Date(Date.now() + 60 * 60 * 1000),
          },
        });

        token.sessionId = session.id.toString();
        token.jti = sessionToken;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };