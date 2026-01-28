import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SubscriptionSection from "@/components/SubscriptionSection";
import NutritionSection from "@/components/NutritionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SubscriptionSection />
      <NutritionSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
