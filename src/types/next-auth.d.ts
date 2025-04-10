import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { ChinguAppRole } from "@/types/UserTypes";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            image: string,
            roles: ChinguAppRole[],
            name: string,
            evaluatorEmail: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        roles: ChinguAppRole[],
        evaluatorEmail: string | null,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        roles: ChinguAppRole[],
        evaluatorEmail: string,
        permissionLastChecked: number | null,
    }
}