import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Inter } from "next/font/google";
import type React from "react";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kutumbakam - वसुधैव कुटुम्बकम् - Disaster Relief Coordination Portal",
  description:
    "A self-service disaster relief and coordination portal that empowers anyone to create, share, and contribute to disaster relief efforts, embodying the spirit of Vasudhaiva Kutumbakam - The World is One Family.",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics/>
      </body>
    </html>
  );
}
