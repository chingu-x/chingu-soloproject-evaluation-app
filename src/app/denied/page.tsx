import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { headers } from "next/headers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

const Denied = async () => {
    const session = await getServerSession(options)
    const headerList = headers()

    console.log(`[Access denied] \n    user: ${session?.user.evaluatorEmail} \n    referer: ${headerList.get('referer')}`)
    Sentry.captureMessage(`[Access denied] user: ${session?.user.evaluatorEmail}`, {
        level: "error"
    })

    
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <ShieldClose className="h-8 w-8 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl">Access Denied</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    <p className="mb-2">You don&apos;t have permission to access this page.</p>
                    <p>Your account doesn&apos;t have the required permissions for this resource.</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                    <Button asChild variant="outline">
                        <Link href="..">Go Back</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
 }

 export default Denied