import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const BASE_URL = "https://www.bangaloresinger.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Book Live Singers in Bangalore – Verified Artists for Weddings & Events",
    template: "%s | Bangalore Singer",
  },
  description:
    "Book verified live singers and bands in Bangalore for weddings, parties & corporate events. Easy booking, secure payments & top-rated performers. Get quotes now!",
  keywords:
    "live singer bangalore, book singer for wedding, hire band for event, live music booking, urban raaga, bangalore singer",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Book Live Singers in Bangalore – Verified Artists for Weddings & Events",
    description:
      "Book verified live singers and bands in Bangalore for weddings, parties & corporate events. Easy booking, secure payments & top-rated performers. Get quotes now!",
    url: BASE_URL,
    siteName: "Bangalore Singer – Urban Raaga",
    type: "website",
    images: [
      {
        url: "/slider-cat-2.jpg",
        width: 1200,
        height: 630,
        alt: "Book Live Singers in Bangalore for Weddings and Events – Urban Raaga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Live Singers in Bangalore – Verified Artists for Weddings & Events",
    description:
      "Book verified live singers and bands in Bangalore for weddings, parties & corporate events. Easy booking, secure payments & top-rated performers.",
    images: ["/slider-cat-2.jpg"],
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
