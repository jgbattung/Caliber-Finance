/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
import { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { createUser } from "@/lib/actions/user.actions"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signOut: '/sign-in',
    error: '/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          // Check if a user with this email already exists
          const existingUser = await (authOptions.adapter as any).getUserByEmail(user.email);

          let firstName = '', lastName = '';

          if (account.provider === 'google') {
            firstName = (profile as any).given_name || '';
            lastName = (profile as any).family_name || '';
          } else if (account.provider === 'facebook') {
            const nameParts = ((profile as any).name || '').split(' ');
            if (nameParts.length > 1) {
              lastName = nameParts.pop() || '';
              firstName = nameParts.join(' ');
            } else {
              firstName = nameParts[0] || '';
              lastName = '';
            }
          }

          if (existingUser) {
            // If the user exists, link the new OAuth account to the existing user
            await (authOptions.adapter as any).linkAccount({
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
            });
          }
    
          await createUser({
            firstName,
            lastName,
            email: user.email || '',
            image: user.image || (user as any).picture || '',
            provider: account.provider,
            confirmedName: false,
          });
    
          return true;
        } catch (error) {
          console.error('Error creating user:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(`${baseUrl}/api/auth/signin`) && url.includes('error=')) {
        const errorParam = new URL(url).searchParams.get('error')
        return `${baseUrl}/error?error=${errorParam}`
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.provider = token.provider as string;
        session.user.email = token.email as string;
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token
    },
  },
}