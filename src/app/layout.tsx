import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@/components/theme-provider";
import Nav from "@/components/Nav";
import AuthProvider from "@/context/AuthProvider";
import Maintenance from "@/components/Maintenance";
import {Toaster} from "react-hot-toast";
import { Suspense } from "react";
import LoadingScreen from "@/app/loading";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Chingu Solo Project',
    description: 'Chingu Solo Project Evaluation App',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
        return <Maintenance/>
    }
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} overflow-auto`} >
        <AuthProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Nav/>
                    <Toaster
                        toastOptions={{
                            style: {
                                background: '#4d7fff',
                                color: '#ddd'
                            },
                            success: {
                                style: {
                                    background: '#b3fcc1',
                                    color: '#000'
                                }
                            },
                            error: {
                                style: {
                                    background: '#fcb3b3',
                                    color: '#000'
                                }
                            },
                        }}
                    />
                    <main>
                        <Suspense fallback={<LoadingScreen />}>
                            {children}
                        </Suspense>
                    </main>
                </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    )
}
