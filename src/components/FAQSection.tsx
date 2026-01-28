import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What ingredients are in Hurayra cat food?",
    answer: "Our recipes feature real meat as the first ingredient, including premium chicken, salmon, and tuna. We use wholesome vegetables, essential vitamins, and minerals. All our products are free from artificial preservatives, colors, and flavors.",
  },
  {
    question: "Is Hurayra suitable for cats with food sensitivities?",
    answer: "Yes! We offer grain-free options and recipes designed for cats with sensitive stomachs. Our formulas are developed with veterinary nutritionists to be easily digestible while providing complete nutrition.",
  },
  {
    question: "How does the subscription work?",
    answer: "Simply choose your products and delivery frequency (every 2, 4, or 8 weeks). You'll save 25% on every order and can modify or cancel anytime. We'll send a reminder before each shipment.",
  },
  {
    question: "How does shipping work?",
    answer: "We offer fast and reliable delivery across UAE. Shipping costs vary based on your location and order size. Express shipping options are also available for faster delivery.",
  },
  {
    question: "What if my cat doesn't like the food?",
    answer: "We offer a 30-day satisfaction guarantee. If your cat doesn't love Hurayra, we'll refund your purchase - no questions asked. We're confident in our halal recipes, but we understand every cat has unique preferences.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, reach out to our friendly support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl border-none px-6 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-primary-foreground text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary-foreground/80 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
