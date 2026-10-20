import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mainul Islam Alif",
  description: "Personal and Professional portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
