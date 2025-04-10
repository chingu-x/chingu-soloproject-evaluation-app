import type { NextAuthOptions} from "next-auth";
import GithubProvider, {GithubProfile} from 'next-auth/providers/github'
import {getUserfromDb} from "@/services/users";
import { ChinguAppRole } from "@/types/UserTypes";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            profile(profile:GithubProfile){
                return {
                    ...profile,
                    id: profile.id.toString(),
                    image: profile.avatar_url ?? '/avatar.svg',
                    // get roles and evaluator email from airtable in signin callback
                    roles: [],
                    evaluatorEmail:null
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
        // check users.email against airtable, to make sure this person is authorized
        async signIn({user}){
            const userFromDb = await getUserfromDb(user.email!!)

            if (!userFromDb.userFound) return false

            user.roles = userFromDb.roles as ChinguAppRole[]
            user.evaluatorEmail = userFromDb.evaluatorEmail as string

            // check if user has the allowed roles and active
            const allowedRoles: ChinguAppRole[] = ["admin", "evaluator"]

            return allowedRoles.some(role=>user.roles.includes(role)) && userFromDb.status === "Active"// only allow access for Active staff with a record on airtable
        },
        // jwt, runs when token is create or refreshed
        // flow: jwt -> session, but not the other way
        async jwt({ token, user }) {
            if (user) {
                console.log("user just logged in")
                // initial login
                token.roles = user.roles!
                token.evaluatorEmail = user.evaluatorEmail as string
                token.permissionLastChecked = Date.now()
            } else {
                console.log("[jwt] user already logged in ")
                const checkInterval = 60 * 60 * 1000 // 1h
                const shouldRefreshPermissions = !token.permissionLastChecked ||
                    Date.now() > token.permissionLastChecked + checkInterval

                if (shouldRefreshPermissions) {
                    console.log(`[jwt] refresh permissions - ${new Date().toLocaleDateString()}`)

                    try {
                        const userInDb = await getUserfromDb(token.email!!)
                        if (userInDb) {
                            token.roles = userInDb.roles as ChinguAppRole[]
                            token.evaluatorEmail = userInDb.evaluatorEmail as string
                        }
                        token.permissionLastChecked = Date.now()
                    } catch (error) {
                        console.error("Failed to refresh permission: ", error)
                    }
                }
            }
            return token
        },
        // session: runs every request
        async session({ session, token }) {
            if (session?.user) {
                session.user.roles = token.roles
                session.user.evaluatorEmail = token.evaluatorEmail
            }
            return session
        },
    }
}