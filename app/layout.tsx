import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Kolaganti — Senior SQL & API Developer",
  description:
    "7+ years building enterprise systems across finance, telecom, and insurance. Java, Spring Boot, AWS, and API architecture for systems handling millions in loan servicing volume.",
  keywords: [
    "Ajay Kolaganti",
    "Senior Java Developer",
    "SQL Developer",
    "API Developer",
    "Spring Boot",
    "AWS",
    "Microservices",
    "Lakeview Loan Servicing",
    "Verizon",
  ],
  authors: [{ name: "Ajay Kolaganti" }],
  openGraph: {
    title: "Ajay Kolaganti — Senior SQL & API Developer",
    description:
      "Enterprise systems engineer specializing in Java, Spring Boot, and SQL architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0D0D0D] text-[#F5F0EB] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
