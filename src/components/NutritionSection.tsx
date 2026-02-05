import { Beef, Sparkles, Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";
import catEating from "@/assets/cat-eating.png";

const nutritionFacts = [
  { icon: Beef, titleKey: "proteinTitle", descKey: "proteinDesc", color: "bg-coral-light text-coral" },
  { icon: Sparkles, titleKey: "vitaminsTitle", descKey: "vitaminsDesc", color: "bg-teal-light text-primary" },
  { icon: Droplets, titleKey: "omegaTitle", descKey: "omegaDesc", color: "bg-secondary text-foreground" },
] as const;

const NutritionSection = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("nutrition.sectionTitle")} <span className="text-primary">{t("nutrition.sectionTitleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("nutrition.sectionSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={catEating}
              alt={t("nutrition.altCat")}
              className="w-full max-w-lg mx-auto rounded-3xl shadow-elevated"
            />
            <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-teal-light rounded-3xl"></div>
          </div>

          {/* Nutrition Facts */}
          <div className="space-y-6">
            {nutritionFacts.map((fact, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-6 bg-card rounded-2xl shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${fact.color} flex items-center justify-center shrink-0`}>
                  <fact.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                    {t(`nutrition.${fact.titleKey}`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`nutrition.${fact.descKey}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
