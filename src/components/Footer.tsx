import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import footerData from '@/data/footer.json'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Main grid: brand + link columns — tighter spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-6 mb-6">
          {/* Brand — compact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-base">🐱</span>
              </div>
              <span className="font-causten text-lg font-bold">
                {footerData.logo.text}
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-snug">
              {footerData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              {footerData.columns[0].title}
            </h4>
            <ul className="space-y-2">
              {footerData.columns[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              {footerData.columns[1].title}
            </h4>
            <ul className="space-y-2">
              {footerData.columns[1].links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm mb-2.5 uppercase tracking-wide text-gray-300">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Notice — compact */}
        <div className="border-t border-gray-800 pt-5 pb-5">
          <h4 className="font-bold text-sm mb-2 text-gray-300 uppercase tracking-wide">
            Contact Information
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-1">
            This website is operated under the licenses of M/s Eurogulf Animal & Birds Food Trading LLC.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed mb-1">
            Dubai Investment Park 2 - Khorasan Warehouses No 2, Dubai, United Arab Emirates
          </p>
          <p className="text-gray-400 text-xs">
            Mail: <a href="mailto:info@eurogulfgroup.com" className="text-primary hover:underline">info@eurogulfgroup.com</a>
            {' · '}
            Phone: <a href="tel:+97148844252" className="text-primary hover:underline">+(971) 48844252</a>
          </p>
        </div>

        {/* Bottom Bar — compact */}
        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © {currentYear} {footerData.logo.text}. All rights reserved.
          </p>
          <div className="flex gap-2">
            {footerData.socialMedia.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                {social.name === 'Facebook' && <Facebook className="w-4 h-4" />}
                {social.name === 'Instagram' && <Instagram className="w-4 h-4" />}
                {social.name === 'Twitter' && <Twitter className="w-4 h-4" />}
                {social.name === 'TikTok' && <MessageCircle className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
