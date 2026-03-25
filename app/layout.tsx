import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Book Live Singers in Bangalore – Verified Artists for Weddings & Events",
  description:
    "Book verified live singers and bands in Bangalore for weddings, parties & corporate events. Easy booking, secure payments & top-rated performers. Get quotes now!",
  keywords:
    "live singer bangalore, book singer for wedding, hire band for event, live music booking, urban raaga",
  openGraph: {
    title: "Book Live Singers in Bangalore – Verified Artists for Weddings & Events",
    description:
      "Book verified live singers and bands in Bangalore for weddings, parties & corporate events. Easy booking, secure payments & top-rated performers. Get quotes now!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
