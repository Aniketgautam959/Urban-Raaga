import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Live Singers & Bands in Bangalore | Urban Raaga",
  description:
    "Browse and filter top-rated live singers and bands in Bangalore by genre, budget, and event type. Find the perfect artist for your wedding, party, or corporate event.",
  alternates: {
    canonical: "https://www.bangaloresinger.in/results",
  },
  openGraph: {
    title: "Browse Live Singers & Bands in Bangalore | Urban Raaga",
    description:
      "Browse and filter top-rated live singers and bands in Bangalore by genre, budget, and event type.",
    url: "https://www.bangaloresinger.in/results",
    images: [{ url: "/slider-cat-2.jpg", width: 1200, height: 630 }],
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
