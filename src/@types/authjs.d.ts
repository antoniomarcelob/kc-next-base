import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
        preferred_username: string,
        userRoles: string[]
    }
  }

  interface User {
    id: string;
    preferred_username: string,
    resource_access: {
        pettFrontDev: {
            roles: string[]
        }
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}