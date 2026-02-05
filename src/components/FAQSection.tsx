import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const faqKeys = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
] as const;

const FAQSection = () => {
  const { t } = useTranslation("home");

  return (
    <section id="faq" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("faq.sectionTitle")}
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            {t("faq.sectionSubtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl border-none px-6 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-primary-foreground text-left font-semibold hover:no-underline py-5 rtl:text-right">
                  {t(`faq.${faq.q}`)}
                </AccordionTrigger>
                <AccordionContent className="text-primary-foreground/80 pb-5">
                  {t(`faq.${faq.a}`)}
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
