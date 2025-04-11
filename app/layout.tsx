import "./globals.css";

import MenuList from "@/components/custom/menu-list";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

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
                <div className="pr-6">
                    <aside className="hidden md:block w-1/4 h-screen bg-gray-100 p-4">
                        <MenuList variant="vertical" />
                    </aside>
                    { children }
                    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-100 p-4 border-t">
                        <MenuList variant="horizontal" />
                    </nav>
                </div>
            </body>
        </html>
    );
}
