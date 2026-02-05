import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Leaf, ShieldCheck } from "lucide-react";

const HalalEcoSection = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 bg-gradient-to-r from-secondary to-secondary/90 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </span>
            <span className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-7 h-7" />
            </span>
          </div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6 text-white [lang=ar]:font-cairo">
            {t("halalEco.title")}
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto text-start rtl:text-right [lang=ar]:font-cairo">
            {t("halalEco.body")}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-white text-secondary px-8 py-4 font-bold hover:bg-white/95 transition-colors shadow-lg"
          >
            {t("halalEco.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HalalEcoSection;
