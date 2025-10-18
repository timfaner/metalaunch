import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/lib/wallet-context-provider";
import { WalletButton } from "@/components/WalletButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaLaunch - Fund Token Launch Projects",
  description: "Invest in token launches on the MetaDAO platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletContextProvider>
          <div className="relative">
            <div className="fixed top-4 right-4 z-50">
              <WalletButton />
            </div>
            {children}
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
