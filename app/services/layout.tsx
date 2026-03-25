import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Singers in Bangalore | Wedding, Corporate & Party Bands | Urban Raaga",
  description:
    "Hire live singers and bands in Bangalore for weddings, corporate events and parties. Bollywood, Kannada, English singers available. Book Urban Raaga today.",
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
