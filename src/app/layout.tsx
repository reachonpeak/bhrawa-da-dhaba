import type { Metadata } from "next";
import { Inter, Frijole, Mukta } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { StructuredData } from "@/components/StructuredData";
import { business } from "@/lib/business";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const frijole = Frijole({
  variable: "--font-yatra",
  weight: "400",
  subsets: ["latin"],
});

const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["400", "600", "700"],
  subsets: ["latin", "devanagari"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bharawan-dhaba.vercel.app"),
  title: {
    default: `${business.name} — Authentic Punjabi Vegetarian in Seven Hills`,
    template: `%s · ${business.name}`,
  },
  description:
    "Bharawan Daa Dhaba — pure vegetarian Punjabi, South Indian & Bombay street food in Seven Hills, NSW. Hand-rolled rotis, tandoor specials, Indian sweets and catering.",
  keywords: [
    "Indian restaurant Seven Hills",
    "Punjabi restaurant Sydney",
    "vegetarian Indian Blacktown",
    "dhaba Sydney",
    "Indian sweets NSW",
    "catering Indian Sydney",
  ],
  openGraph: {
    title: business.name,
    description: "Authentic pure-vegetarian Punjabi dhaba in Seven Hills, NSW.",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${frijole.variable} ${mukta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream-soft">
        <StructuredData />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
