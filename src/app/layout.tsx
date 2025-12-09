import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CustomLayoutProps } from "@/types/CustomLayoutProps";

export const metadata: Metadata = {
  title: "Sociax",
  description:
    "A social media website to share your thoughts, connect with your friends, share your music playlist etc all in one website",
};

const roboto = Roboto()

export default function RootLayout({ children }: CustomLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
