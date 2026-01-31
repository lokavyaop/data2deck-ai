import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyItMattersSection from "@/components/landing/WhyItMattersSection";
import PricingSection from "@/components/landing/PricingSection";
import HackathonSection from "@/components/landing/HackathonSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <WhyItMattersSection />
      <PricingSection />
      <HackathonSection />
      <Footer />
    </div>
  );
};

export default Index;
