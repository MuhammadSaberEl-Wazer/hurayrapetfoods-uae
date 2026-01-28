import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import footerData from '@/data/footer.json'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-lg">🐱</span>
              </div>
              <span className="font-causten text-xl font-bold">
                {footerData.logo.text}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {footerData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{footerData.columns[0].title}</h4>
            <ul className="space-y-3">
              {footerData.columns[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="text-gray-400 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4">{footerData.columns[1].title}</h4>
            <ul className="space-y-3">
              {footerData.columns[1].links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="text-gray-400 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} {footerData.logo.text}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {footerData.socialMedia.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                {social.name === 'Facebook' && <Facebook className="w-5 h-5" />}
                {social.name === 'Instagram' && <Instagram className="w-5 h-5" />}
                {social.name === 'Twitter' && <Twitter className="w-5 h-5" />}
                {social.name === 'TikTok' && <MessageCircle className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
