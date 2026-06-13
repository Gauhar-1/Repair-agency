import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "ArcticEdge — Premium AC & Refrigerator Engineering in Guwahati",
  description:
    "Background-verified full-time specialists. Upfront pricing. 30-day digital warranty. Book your technician now for AC and refrigerator repair, maintenance, and annual service contracts.",
  keywords: [
    "AC repair Guwahati",
    "refrigerator repair",
    "AC maintenance",
    "AMC service",
    "split AC cleaning",
    "fridge repair near me",
  ],
  openGraph: {
    title: "ArcticEdge — Premium AC & Refrigerator Engineering",
    description:
      "No random freelancers. No hidden fees. Just background-verified, full-time local specialists backed by a 30-Day Digital Warranty.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
