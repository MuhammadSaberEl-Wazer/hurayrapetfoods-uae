import { Beef, Sparkles, Droplets } from "lucide-react";
import catEating from "@/assets/cat-eating.png";

const nutritionFacts = [
  {
    icon: Beef,
    title: "55% Protein",
    description: "High-quality animal protein for strong muscles and healthy development",
    color: "bg-coral-light text-coral",
  },
  {
    icon: Sparkles,
    title: "Vitamins A, D, E",
    description: "Essential vitamins for a shiny coat, bright eyes, and strong immune system",
    color: "bg-teal-light text-primary",
  },
  {
    icon: Droplets,
    title: "Omega 3 & 6",
    description: "Healthy fats for brain development and a lustrous, healthy coat",
    color: "bg-secondary text-foreground",
  },
];

const NutritionSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Right Nutrition for a <span className="text-primary">Better Life</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each recipe is carefully formulated to provide complete and balanced nutrition for cats of all life stages
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={catEating}
              alt="Cat enjoying nutritious meal"
              className="w-full max-w-lg mx-auto rounded-3xl shadow-elevated"
            />
            {/* Decorative elements */}
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
                    {fact.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {fact.description}
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
