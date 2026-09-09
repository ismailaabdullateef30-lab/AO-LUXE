/**
 * Root layout - wraps every page with the fonts, navbar and footer.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Headings - editorial serif
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Body copy - clean sans serif
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Class, Value & Elegance`,
    template: `%s | ${site.name}`,
  },
  description:
    "AO Luxe Events plans and coordinates luxury weddings, birthdays and corporate occasions across Nigeria. We handle the concept, the budget, the vendors and the day itself: class, value and elegance from first idea to final flourish.",
  keywords: [
    "event planning Nigeria",
    "luxury event planner",
    "wedding planner Lagos",
    "day-of coordination Nigeria",
    "event coordinator Lagos",
    "AO Luxe Events",
  ],
  openGraph: {
    title: `${site.name} | Class, Value & Elegance`,
    description: site.shortDescription,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.logo }],
    locale: "en_NG",
    type: "website",
  },
  icons: { icon: site.logo, apple: site.logo },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
