import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    avatar: "SM",
    cat: "Luna (Persian)",
    rating: 5,
    text: "My picky Luna finally loves her food! She's been eating HurayraPetFood.ae for 3 months now and her coat has never looked better. The halal quality is amazing!",
  },
  {
    name: "Michael Chen",
    avatar: "MC",
    cat: "Whiskers (Tabby)",
    rating: 5,
    text: "After trying countless brands, HurayraPetFood.ae is the only one Whiskers actually finishes. The natural ingredients really make a difference. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    avatar: "ER",
    cat: "Oliver (Maine Coon)",
    rating: 5,
    text: "Oliver is a big boy who needs quality nutrition. Since switching to HurayraPetFood.ae, his energy levels are up and his digestive issues are gone. Thank you!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hear it from the <span className="text-primary">Picky-Eater Parents</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of happy cat parents who made the switch
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground fill-current" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.cat}</p>
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
