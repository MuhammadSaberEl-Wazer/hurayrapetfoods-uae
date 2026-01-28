import { Heart, Leaf, Shield, Truck, CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every recipe crafted with care for your feline's happiness",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No artificial preservatives, colors, or flavors",
  },
  {
    icon: Shield,
    title: "Vet Approved",
    description: "Formulated with veterinary nutritionists",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest ingredients sourced globally",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping across UAE",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction Guaranteed",
    description: "30-day money-back guarantee",
  },
];

const badges = [
  "Premium Adult Formula",
  "Kitten Growth",
  "Chicken Flavor",
  "Salmon & Tuna",
  "Hairball Control",
  "Indoor Cat Formula",
  "High Protein",
  "Grain Free Options",
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Good Stuff We Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hurayra Pet Foods is made with the highest quality halal ingredients to keep your cat healthy and happy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-light flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Product Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-5 py-2.5 bg-secondary rounded-full text-sm font-semibold text-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
