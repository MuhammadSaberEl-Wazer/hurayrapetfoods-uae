import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import catEating from "@/assets/cat-eating.png";
import productBag from "@/assets/product-bag.png";

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen pt-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-primary-foreground/90 text-sm font-medium">
                Trusted by 10,000+ cat parents
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              For the Lives that
              <br />
              <span className="text-accent">Make Ours Whole</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg">
              Premium, nutritious cat food made with real ingredients your feline friend will love. 
              Because they deserve the very best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-coral text-lg px-8 py-6 rounded-full font-bold"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full font-bold bg-transparent"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {["100% Natural", "Vet Approved", "Free Shipping"].map((badge) => (
                <div
                  key={badge}
                  className="px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  ✓ {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative z-10">
            <div className="relative">
              {/* Main Cat Image */}
              <img
                src={catEating}
                alt="Happy cat eating premium food"
                className="w-full max-w-lg mx-auto animate-float"
              />
              
              {/* Product Bag Overlay */}
              <img
                src={productBag}
                alt="Purrfect Meals product bag"
                className="absolute -right-8 md:right-0 bottom-0 w-40 md:w-56 animate-float-delayed drop-shadow-2xl"
              />

              {/* Decorative Circle */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-primary-foreground/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
