import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserRole } from "@prisma/client";
import { User } from "@prisma/client"

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
      async authorize(credentials) {
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
        const existingSession = await prisma.session.findFirst({
          where: { userId: Number(user.id) },
        });

        if (existingSession) {
          if (existingSession.expires > new Date()) {

            await prisma.session.update({
              where: { id: existingSession.id },
              data: {
                expires: new Date(Date.now() + 60 * 60 * 1000),
              },
            });
          } else {

            const sessionToken = crypto.randomBytes(32).toString("hex");
            const u = user as any as User;

            const newSession = await prisma.session.create({
              data: {
                userId: Number(user.id),
                sessionToken,
                expires: new Date(Date.now() + 60 * 60 * 1000),
                role: u.role,
              },
            });

            token.sessionId = newSession.id.toString();
            token.jti = sessionToken;
          }
        } else {

          const sessionToken = crypto.randomBytes(32).toString("hex");
          const u = user as any as User;

          const newSession = await prisma.session.create({
            data: {
              userId: Number(user.id),
              sessionToken,
              expires: new Date(Date.now() + 60 * 60 * 1000),
              role: u.role,
            },
          });

          token.sessionId = newSession.id.toString();
          token.jti = sessionToken;
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };