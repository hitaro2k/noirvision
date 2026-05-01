import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans"
});

export const metadata: Metadata = {
  title: "Noir Planner",
  description: "AI content planning for creators."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-noir-bg text-noir-text`}>
        {children}
      </body>
    </html>
  );
}
