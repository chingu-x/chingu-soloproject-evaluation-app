import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware(request: NextRequestWithAuth){
        // console.log(request.nextUrl.pathname)
        // console.log("next auth token", request.nextauth.token)

        if(request.nextUrl.pathname.startsWith("/admin") && !request.nextauth.token?.roles.includes("admin") ){
            console.log("starts with /")
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    }
)


// all pages require authentication
export const config = {
    matcher: ["/:path*"]
}