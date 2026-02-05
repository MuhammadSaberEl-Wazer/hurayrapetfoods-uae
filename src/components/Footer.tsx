import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const QUICK_LINKS = [
  { url: "/", key: "nav.home" },
  { url: "/products", key: "nav.products" },
  { url: "/about", key: "footer.aboutUs" },
  { url: "/why-halal", key: "nav.whyHalal" },
  { url: "/contact", key: "nav.contact" },
  { url: "/blog", key: "nav.blog" },
  { url: "/#faq", key: "footer.faq" },
] as const;

const PRODUCT_LINKS = [
  { url: "/products#top", key: "footer.allProducts" },
  { url: "/products?type=chicken#top", key: "footer.chickenFormula" },
  { url: "/products?type=tuna#top", key: "footer.tunaFormula" },
  { url: "/products?type=combo#top", key: "footer.comboFormula" },
] as const;

const LEGAL_LINKS = [
  { url: "/privacy", key: "footer.privacyPolicy" },
  { url: "/terms", key: "footer.termsConditions" },
  { url: "/shipping", key: "footer.shippingPolicy" },
  { url: "/returns", key: "footer.returnsRefunds" },
] as const;

const SOCIAL = [
  { name: "Facebook", url: "https://facebook.com/hurayrapetfoods", Icon: Facebook },
  { name: "Instagram", url: "https://instagram.com/hurayrapetfoods", Icon: Instagram },
  { name: "Twitter", url: "https://twitter.com/hurayrapetfoods", Icon: Twitter },
  { name: "TikTok", url: "https://tiktok.com/@hurayrapetfoods", Icon: MessageCircle },
] as const;

const Footer = () => {
  const { t, i18n } = useTranslation("common");
  const currentYear = new Date().getFullYear();
  const isAr = i18n.language === "ar";

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-6 mb-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img
                src="/logos/Hurayra-uae-svg-logo.svg"
                alt={t("footer.logoText")}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-snug">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              {t("footer.products")}
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="border-t border-gray-800 pt-5 pb-5">
          <h4 className="font-bold text-sm mb-2 text-gray-300 uppercase tracking-wide">
            {t("footer.contactInfo")}
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-1">
            {t("footer.legalNotice")}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed mb-1">
            {t("footer.address")}
          </p>
          <p className="text-gray-400 text-xs">
            {t("footer.mail")}: <a href="mailto:info@eurogulfgroup.com" className="text-primary hover:underline">info@eurogulfgroup.com</a>
            {" · "}
            {t("footer.phone")}: <a href="tel:+97148844252" className="text-primary hover:underline">+(971) 48844252</a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            {isAr ? (
              <>{t("footer.copyright")}. {t("footer.logoText")} © {currentYear}</>
            ) : (
              <>© {currentYear} {t("footer.logoText")}. {t("footer.copyright")}</>
            )}
          </p>
          <div className="flex gap-2">
            {SOCIAL.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <social.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
