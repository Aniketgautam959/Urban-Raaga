import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Raaga – Book Live Singer & Band for Events in Bangalore",
  description:
    "Urban Raaga is your trusted platform to book live singers and bands for weddings, house parties, corporate events and more in Bangalore and across India. Verified artists, easy booking, secure payments.",
  keywords:
    "live singer bangalore, book singer for wedding, hire band for event, live music booking, urban raaga",
  openGraph: {
    title: "Urban Raaga – Book Live Singer & Band for Your Event",
    description:
      "Discover and book verified live singers and bands for any occasion. Urban Raaga – making every event musical.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
