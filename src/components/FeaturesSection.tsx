import { Heart, Leaf, Shield, Truck, CheckCircle, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const featureKeys = [
  { icon: Heart, titleKey: "features.madeWithLove", descKey: "features.madeWithLoveDesc" },
  { icon: Leaf, titleKey: "features.natural", descKey: "features.naturalDesc" },
  { icon: Shield, titleKey: "features.vetApproved", descKey: "features.vetApprovedDesc" },
  { icon: Award, titleKey: "features.quality", descKey: "features.qualityDesc" },
  { icon: Truck, titleKey: "features.delivery", descKey: "features.deliveryDesc" },
  { icon: CheckCircle, titleKey: "features.satisfaction", descKey: "features.satisfactionDesc" },
] as const;

const badgeKeys = ["badge1", "badge2", "badge3", "badge4", "badge5", "badge6", "badge7", "badge8"] as const;

const FeaturesSection = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("features.sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("features.sectionSubtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featureKeys.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-light flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Product Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {badgeKeys.map((key) => (
            <span
              key={key}
              className="px-5 py-2.5 bg-secondary rounded-full text-sm font-semibold text-secondary-foreground border border-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
            >
              {t(`features.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
