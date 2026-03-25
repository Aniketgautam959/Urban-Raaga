import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us – Book Live Singers in Bangalore | Urban Raaga",
  description:
    "Get in touch with Urban Raaga to book verified live singers and bands in Bangalore for weddings, corporate events, house parties, and more. Call or WhatsApp us today.",
  alternates: {
    canonical: "https://www.bangaloresinger.in/contact",
  },
  openGraph: {
    title: "Contact Us – Book Live Singers in Bangalore | Urban Raaga",
    description:
      "Get in touch with Urban Raaga to book verified live singers and bands in Bangalore for weddings, corporate events, house parties, and more.",
    url: "https://www.bangaloresinger.in/contact",
    images: [{ url: "/slider-cat-2.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
