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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Urban Raaga",
    "image": "https://urbanraaga.com/logo.png",
    "description": "Urban Raaga is Bangalore's trusted platform to book live singers and bands for weddings, parties, and corporate events.",
    "telephone": "+919424700519",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "url": "https://urbanraaga.com"
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
