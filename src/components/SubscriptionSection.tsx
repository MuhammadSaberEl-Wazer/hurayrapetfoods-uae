import { Package, Calendar, Percent, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import catSitting from "@/assets/cat-sitting.png";

const benefitKeys = [
  { icon: Package, titleKey: "neverRunOut", descKey: "neverRunOutDesc" },
  { icon: Calendar, titleKey: "flexiblePlans", descKey: "flexiblePlansDesc" },
  { icon: Percent, titleKey: "save25", descKey: "save25Desc" },
  { icon: Gift, titleKey: "freeTreats", descKey: "freeTreatsDesc" },
] as const;

const SubscriptionSection = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-dark/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <span className="inline-block px-4 py-1 bg-accent rounded-full text-accent-foreground text-sm font-bold mb-6">
              {t("subscription.badge")}
            </span>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("subscription.titleLine1")}
              <br />
              <span className="text-accent">{t("subscription.titleLine2")}</span>
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-lg">
              {t("subscription.subtitle")}
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefitKeys.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-foreground">{t(`subscription.${benefit.titleKey}`)}</h4>
                    <p className="text-sm text-primary-foreground/80">{t(`subscription.${benefit.descKey}`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-coral text-lg px-8 py-6 rounded-full font-bold"
            >
              {t("subscription.cta")}
            </Button>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center items-center">
            {/* Big Discount Badge */}
            <div className="absolute top-0 right-0 md:top-10 md:right-10 w-32 h-32 md:w-40 md:h-40 bg-accent rounded-full flex flex-col items-center justify-center text-accent-foreground shadow-coral z-20 animate-bounce-gentle">
              <span className="text-4xl md:text-5xl font-bold">25%</span>
              <span className="text-xl font-bold">{t("subscription.offLabel")}</span>
            </div>

            {/* Cat Image */}
            <img
              src={catSitting}
              alt={t("subscription.altCat")}
              className="w-full max-w-md animate-float"
            />

            {/* Background Circle */}
            <div className="absolute -z-10 w-[80%] aspect-square bg-teal-dark/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
