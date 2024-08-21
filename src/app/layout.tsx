import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import Providers from "./components/Providers";
import { auth } from "@/auth";
import { AuthProvider } from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LRWC forum",
  description: "Message board for LRWC members",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" data-theme="dim">
      <body className={inter.className}>
        <Providers>
          <AuthProvider session={session}>
            <Navbar />
            <div className="container h-full pt-12">{children}</div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
