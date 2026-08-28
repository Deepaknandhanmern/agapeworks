import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { AIChatLauncher } from "@/components/ui/ai-chat-launcher";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Body and headings use Apple's own system-font stack (globals.css
// --font-sans): -apple-system/BlinkMacSystemFont resolve to San Francisco
// on Mac/iOS (same technique apple.com itself uses, not a downloadable
// webfont), falling back to Helvetica/Arial elsewhere.

export const metadata: Metadata = {
  title: "Agape Works",
  description: "Agape Works — consulting and product engineering that ships.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <CinematicFooter />
        <AIChatLauncher />
      </body>
    </html>
  );
}
