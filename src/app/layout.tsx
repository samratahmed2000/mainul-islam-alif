import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

const site = getSiteSettings();

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn">
      <body>
        <a className="skip-link" href="#main-content">
          মূল কনটেন্টে যান
        </a>
        <Navbar />
        <main id="main-content" className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
