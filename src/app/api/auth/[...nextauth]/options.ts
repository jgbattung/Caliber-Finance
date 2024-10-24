/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
import { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { createUser } from "@/lib/actions/user.actions"
import { AuthProvider } from "@/lib/models/User"

interface IGoogleProfile {
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
}

interface IFacebookProfile {
  name?: string;
  email?: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      },
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
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 180 * 24 * 60 * 60,   // 180 days
    updateAge: 7 * 24 * 60 * 60  // 7 days
  },
  pages: {
    signOut: '/sign-in',
    signIn: '/sign-in',
    error: '/error',
  },
  callbacks: {
    async signIn({ user, account, profile },) {
      try {
        if (!user?.email) {
          console.error('Sign-in rejected: No email provided');
          return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
          console.error('Sign-in rejected: Invalid email format');
          return false;
        }

        let firstName = '', lastName = '', imageUrl = '';
        const adapter = authOptions.adapter as any;
        const existingUser = await adapter.getUserByEmail(user.email);

        // Parse Provider data
        switch(account?.provider as AuthProvider) {
          case 'google': {
            const googleProfile = profile as IGoogleProfile;
            if (!googleProfile.email_verified) {
              console.error('Sign-in rejected: Google email not verified');
              return false;
            }
            firstName = googleProfile.given_name || '';
            lastName = googleProfile.family_name || '';
            imageUrl = googleProfile.picture || user.image || '';
            break;
          }
          case 'facebook': {
            const facebookProfile = profile as IFacebookProfile;
            const nameParts = (facebookProfile.name || '').split(' ');
            if (nameParts.length > 1) {
              lastName = nameParts.pop() || '';
              firstName = nameParts.join(' ');
            } else {
              firstName = nameParts[0] || '';
            }
            imageUrl = facebookProfile.picture?.data?.url || user.image || '';
            break;
          }
          case 'email': {
            break;
          }
          default: {
            console.error('Sign-in rejected: Unsupported provider');
            return false
          }
        }

        // Link account if user exists
        if (existingUser && account) {
          await adapter.linkAccount({
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
          });
        }

        // Create/update user in DB
        await createUser({
          firstName,
          lastName,
          email: user.email,
          image: imageUrl,
          provider: account?.provider as AuthProvider,
          providerAccountId: account?.providerAccountId,
          confirmedName: false,
        });

        return true;

      } catch (error) {
        console.error('Error in signin callback:', error);
        return false;
      }
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