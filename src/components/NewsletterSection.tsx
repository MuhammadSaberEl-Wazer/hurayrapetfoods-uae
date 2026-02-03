import { useState } from "react";
import { Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import catSitting from "@/assets/cat-sitting.png";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the family! 🐱",
        description: "You've successfully joined the HurayraPetFood.ae newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-coral-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="hidden lg:flex justify-center">
            <img
              src={catSitting}
              alt="Happy cat"
              className="w-full max-w-sm animate-float"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
              <Heart className="w-4 h-4 text-accent fill-current" />
              <span className="text-accent font-semibold text-sm">Join Our Family</span>
            </div>

            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the
              <br />
              <span className="text-primary">HurayraPetFood.ae Family</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Subscribe to our newsletter for exclusive discounts, cat care tips, and be the first 
              to know about new products!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-full px-6 text-lg border-2 border-border focus:border-primary"
                required
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-primary hover:bg-teal-dark text-primary-foreground shadow-teal h-14 px-8 rounded-full font-bold"
              >
                Subscribe
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
