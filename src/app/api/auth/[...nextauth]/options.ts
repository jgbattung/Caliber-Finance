/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
import { NextAuthOptions, Session } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { createUser } from "@/lib/actions/user.actions"
import { AuthProvider } from "@/lib/models/User"
import { JWT } from "next-auth/jwt"

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

interface IExtendedSession extends Session {
  user: {
    id: string;
    email: string;
    provider: string;
    name?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
  }
}

interface IExtendedJWT extends JWT {
  provider?: string;
  email?: string;
  emailVerified?: Date | null;
  lastLogin?: Date;
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
      try {
        if (url.includes('error=Verification') || 
            (url.includes('/api/auth/callback/email') && url.includes('error'))) {
          return `${baseUrl}/error?error=Verification`;
        }

        if (url.includes('error=')) {
          const errorUrl = new URL(url);
          const error = errorUrl.searchParams.get('error');
          return `${baseUrl}/error?error=${error}`;
        }

        if (url.startsWith(`${baseUrl}/api/auth/callback`)) {
          const callbackUrl = new URL(url);
          const destination = callbackUrl.searchParams.get('callbackUrl');
          if (destination && destination.startsWith(baseUrl)) {
            return destination;
          }
          return `${baseUrl}/dashboard`;
        }

        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }

        if (url.startsWith(baseUrl)) {
          return url;
        }

        return baseUrl;
      } catch (error) {
        console.error('Redirect error:', error);
        return `${baseUrl}/error?error=RedirectError`;
      }
    },
    async jwt({ token, user, account, trigger, session }): Promise<IExtendedJWT> {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          email: user.email || undefined,
          provider: account.provider,
          emailVerified: user.emailVerified,
          lastLogin: new Date()
        };
      }

      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }): Promise<IExtendedSession> {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub!,
          email: token.email || '',
          provider: token.provider as string,
          emailVerified: token.emailVerified,
        };

        delete (session as any).password;
      }

      return session as IExtendedSession;
    },
  },
}