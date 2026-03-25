import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Live Singers for Weddings & Events in Bangalore | Services",
  description:
    "Explore Urban Raaga's full range of live music services — wedding singers, Bollywood artists, Kannada singers, English performers, and live bands across Bangalore.",
  alternates: {
    canonical: "https://www.bangaloresinger.in/services",
  },
  openGraph: {
    title: "Book Live Singers for Weddings & Events in Bangalore | Services",
    description:
      "Explore Urban Raaga's full range of live music services — wedding singers, Bollywood artists, Kannada singers, English performers, and live bands across Bangalore.",
    url: "https://www.bangaloresinger.in/services",
    images: [{ url: "/slider-cat-2.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
