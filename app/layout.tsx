import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, GlassWater } from "lucide-react";
import Link from "next/link";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ox4Me",
    description: "Gère tes cocktails et tes dispos à l'Ox !",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={ `${geistSans.variable} ${geistMono.variable} antialiased` }>
                <SidebarProvider>
                    <Sidebar>
                        <SidebarHeader>
                            <h1 className="text-2xl font-bold">Ox4Me</h1>
                            <p className="text-sm text-muted-foreground">Gère tes cocktails et tes dispos à l&apos;Ox !</p>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/calendrier" className="flex items-center gap-2">
                                                <Calendar size={ 20 } />
                                                Calendrier
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/cocktails" className="flex items-center gap-2">
                                                <GlassWater size={ 20 } />
                                                Cocktails
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <SidebarTrigger className="m-2" />
                    <div className="flex w-full py-6 pe-6">
                        { children }
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
