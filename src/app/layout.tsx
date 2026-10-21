import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getSiteSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const site = getSiteSettings();
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "en_US",
    type: "website",
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
  },
  ...(siteUrl
    ? {
        metadataBase: siteUrl,
        alternates: { canonical: "/" },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
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
