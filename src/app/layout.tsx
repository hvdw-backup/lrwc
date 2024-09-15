import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import Providers from "./components/Providers";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
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
          {session && <Navbar />}
          <div className="container h-full pt-12">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
