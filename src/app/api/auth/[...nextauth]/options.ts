import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          const user = await User.findOne({
            $or: [
              { email: credentials?.email }, // matches email
              { username: credentials?.email }, // matches username
            ],
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );

          if (!isValid) return null;

          // Return the user object
          return {
            id: user._id.toString(),
            name: user.firstName + " " + user.lastName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // store info in JWT
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user }
      }
      if (user) {
        ((token.id = user.id), (token.verified = user.verified));
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.profileImageUrl = user.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        username: token.username as string,
        avatar: token.avatar as string,
        verified: token.verified as boolean,
      };

      return session;
    },
  },
  pages: {
    signIn: "/sign-in", // custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
