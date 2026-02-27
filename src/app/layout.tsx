import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Immuny — AI-Powered Allergy Safety App",
  description: "Immuny helps people with allergies stay safe with real-time food scanning, emergency protocols, and an AI allergy assistant.",
  icons: {
    icon: [{ url: "/immuny-logo.avif", type: "image/avif" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
