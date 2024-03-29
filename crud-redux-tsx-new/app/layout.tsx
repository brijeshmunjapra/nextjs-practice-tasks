import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProviderComp from "../components/ProviderComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New Crud redux",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderComp>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
      </html>
    </ProviderComp>
  );
}
