import { User } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole,
  }

  interface Session {
    user: {
      id: string,
      role: UserRole
    } & DefaultSession
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string,
    role: UserRole,
  }
}