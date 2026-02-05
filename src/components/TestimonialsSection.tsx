import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonialKeys = [
  { avatar: "SM", nameKey: "t1Name", catKey: "t1Cat", textKey: "t1Text" },
  { avatar: "MC", nameKey: "t2Name", catKey: "t2Cat", textKey: "t2Text" },
  { avatar: "ER", nameKey: "t3Name", catKey: "t3Cat", textKey: "t3Text" },
] as const;

const TestimonialsSection = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            {t("testimonials.sectionTitle")} <span className="text-accent">{t("testimonials.sectionTitleHighlight")}</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {t("testimonials.sectionSubtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialKeys.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 relative"
            >
              <div className="absolute -top-4 left-8 rtl:left-auto rtl:right-8">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground fill-current" />
                </div>
              </div>

              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                &quot;{t(`testimonials.${testimonial.textKey}`)}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t(`testimonials.${testimonial.nameKey}`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`testimonials.${testimonial.catKey}`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
