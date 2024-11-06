import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      provider: string;
      name?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string;
    emailVerified?: Date | null;
  }

  interface NextAuthOptions {
    providers: Provider[]
    session?: Partial<SessionOptions>
    callbacks?: Partial<CallbacksOptions>
    // Add other options as needed
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    sub: string;
    email?: string;
    provider?: string;
    emailVerified?: Date | null;
    lastLogin?: Date;
  }
}