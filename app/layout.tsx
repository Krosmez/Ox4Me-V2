import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
            <body
                className={ `${geistSans.variable} ${geistMono.variable} antialiased` }
            >
                <div className="py-6">
                    { children }
                </div>
            </body>
        </html>
    );
}
