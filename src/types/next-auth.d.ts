import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name?: string;
    username?: string;
    email?: string;
    id?: string;
    avatar?: string;
    verified?: boolean;
  }

  interface Session {
    user: {
      name?: string;
      username?: string;
      email?: string;
      id?: string;
      avatar?: string;
      verified?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string;
      username?: string;
      email?: string;
      id?: string;
      avatar?: string;
      verified?: boolean;
    };
  }
}
