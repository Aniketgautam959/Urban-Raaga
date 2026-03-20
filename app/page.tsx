import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ImageSlider from "@/components/ImageSlider";
import WhoWeAre from "@/components/WhoWeAre";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <ImageSlider />
      <WhoWeAre />
      <FAQ />
      <Footer />
    </main>
  );
}
