import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
      image: string
      provider?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
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
  }
}