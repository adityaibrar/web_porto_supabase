import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flutter Developer Portfolio - Professional Mobile App Developer",
  description:
    "Professional Flutter Developer Portfolio showcasing mobile app development expertise, projects, and technical skills in cross-platform development.",
  keywords: [
    "Flutter Developer",
    "Mobile App Development",
    "Cross-Platform",
    "Android",
    "iOS",
    "Dart",
    "Portfolio",
  ],
  authors: [{ name: "Flutter Developer" }],
  openGraph: {
    title: "Flutter Developer Portfolio",
    description:
      "Professional Flutter Developer Portfolio showcasing mobile app development expertise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter Developer Portfolio",
    description:
      "Professional Flutter Developer Portfolio showcasing mobile app development expertise",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
