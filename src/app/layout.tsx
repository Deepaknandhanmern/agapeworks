import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { AnnouncementToast } from "@/components/sections/announcement-toast";
import { ConciergeChat } from "@/components/sections/concierge-chat";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Secondary/body text (globals.css --font-sans).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Primary/heading font (globals.css --font-heading).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agape Works",
  description: "Agape Works — consulting and product engineering that ships.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CinematicFooter />
        <AnnouncementToast />
        <ConciergeChat />
        <BackToTopButton />
      </body>
    </html>
  );
}
