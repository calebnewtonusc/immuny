import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Immuny — UX Case Study",
  description: "A mobile UX redesign for Immuny, an allergy emergency assistance app. Focused on minimizing cognitive load and enabling faster emergency response.",
  keywords: ["UX Design", "Mobile App", "Allergy", "Emergency", "Figma", "Usability Testing", "HCI"],
  openGraph: {
    title: "Immuny — UX Case Study",
    description: "Mobile UX redesign for Immuny allergy emergency app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
