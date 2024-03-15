import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "@/utils/sendVerificationRequest";
import { JWT } from "next-auth/jwt";
import { Awaitable, SendVerificationRequestParams } from "@/lib/interfaces";

export const authOptions: NextAuthOptions = {
  // FTM-2 / FTM-21 5. NextAuth setup
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  // FTM-2 / FTM-17 1. Add email provider
  providers: [
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
      // sendVerificationRequest: async (params: SendVerificationRequestParams) => {
      //   await sendVerificationRequest(params);
      // },
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        sendVerificationRequest({ identifier: email, url, provider: {
          server, from,
          id: "email",
          type: "email",
          name: "Email",
          maxAge: 0,
          sendVerificationRequest: function (params: SendVerificationRequestParams): Awaitable<void> {
            throw new Error("Function not implemented.");
          }
        } })
      },
    }),

  ],
  // FTM-2 / FTM-21 6. Callbacks
  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      
      if(trigger === 'update'){ 
        return {
          ...token, ...session
        }
      }

      if (token && user && token.email && user.email) {
        // console.log('Token email:', token.email);
  
        const dbUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
  
        const emailDomain = user?.email?.toLowerCase().split('@').pop()?.split('.')[0]
        // console.log(emailDomain)
        const dbClient = await prisma.client.findFirst({
          where: {
            domain: emailDomain
          }
        })

        const dbClientUser = await prisma.clientUser.findFirst({
          where: {
            userId: user.id
          }
        })

        if (dbUser || dbClientUser || dbClient) {
          return {
            id: dbUser.id,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            email: dbUser.email,
            userDomain: dbUser.userDomain,
            image: dbUser.image,
            role: dbClientUser?.role,
            clientId: dbClientUser?.clientId,
            user: {
              id: dbUser.id,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              email: dbUser.email,
              image: dbUser.image,
              userDomain: dbUser.userDomain,
            },
            clientUser: {
              role: dbClientUser?.role, 
              clientId: dbClientUser?.clientId,
            },
            client: {
              domain: dbClient?.domain,
              id: dbClient?.id,
              companyName: dbClient?.companyName,
              website: dbClient?.website,
              description: dbClient?.description,
              countryCode: dbClient?.countryCode,
              phoneNumber: dbClient?.phoneNumber,
              streetNo: dbClient?.streetNo,
              streetAddress: dbClient?.streetAddress,
              province: dbClient?.province,
              zipCode: dbClient?.zipCode,
              country: dbClient?.country
            }
          }
        }
      }
      // console.log(token)
      return token;
    },

    async session({ token, session, trigger, newSession }) {
      if (trigger === "update" && newSession) {
        session = newSession
      }
      if (token) {
        session.role = token.role;
        // session.userDomain = token.userDomain;
        // session.firstName = token.firstName;
        // session.lastName = token.lastName;
        // session.email = token.email;
        session.user = {
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          image: token.image,
          userDomain: token.userDomain
        };
        session.clientUser = {
          role: token.role, 
          clientId: token.clientId, 
        };

        session.client = {
          domain: token.domain,
          id: token.id,
          name: token.name,
          website: token.website,
          description: token.description,
          countryCode: token.countryCode,
          phoneNumber: token.phoneNumber,
          streetNo: token.streetNo,
          streetAddress: token.streetAddress,
          province: token.province,
          zipCode: token.zipCode,
          country: token.country
        }
      }
      return session;
    },
  },
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      // console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
    },
  },
  // FTM-2 / FTM-21 7. Custom auth pages
  pages: {
    signIn: "/auth/signin",
    // FTM-2 / FTM-17 6. New users routed to sign up
    newUser: '/auth/signup',
    error: '/auth/error', 
    verifyRequest: "/auth/verify"
  },
  theme: {
    colorScheme: "light",
  },
  // debug: true
};
