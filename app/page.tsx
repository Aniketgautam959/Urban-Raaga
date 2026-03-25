import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ImageSlider from "@/components/ImageSlider";
import WhoWeAre from "@/components/WhoWeAre";
import FAQ from "@/components/FAQ";
import OurClients from "@/components/OurClients";
import Footer from "@/components/Footer";
import { faqs } from "@/lib/data";

const BASE_URL = "https://www.bangaloresinger.in";

// ─── Server-side Schemas ───────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#organization`,
  "name": "Urban Raaga",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "image": `${BASE_URL}/logo.png`,
  "description": "Urban Raaga is Bangalore's trusted platform to book live singers and bands for weddings, parties, and corporate events.",
  "telephone": "+919424700519",
  "email": "support@bangaloresinger.in",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "24, Indiranagar 2nd Stage",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560038",
    "addressCountry": "IN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "120",
    "bestRating": "5"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Server-side schemas — visible in page source, crawled by Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <ImageSlider />
      <WhoWeAre />
      <FAQ />
      <OurClients />
      <Footer />
    </main>
  );
}

