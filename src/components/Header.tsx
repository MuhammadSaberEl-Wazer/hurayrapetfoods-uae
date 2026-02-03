import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/CartIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo — white SVG on primary background */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logos/main-logo.svg"
              alt="HurayraPetFood.ae"
              className="h-9 w-auto md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-white font-semibold"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CartIcon variant="light" />
            <Link to="/products">
              <Button className="hidden md:flex bg-white hover:bg-white/90 text-primary font-semibold">
                Shop Now
              </Button>
            </Link>
            {user ? (
              <Link to="/account">
                <Button variant="outline" size="sm" className="hidden md:inline-flex gap-2 border-white text-white hover:bg-white/10 hover:text-white">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/10 hover:text-white">
                    <User className="w-5 h-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="flex items-center gap-2 cursor-pointer">
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-3 font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-white font-semibold"
                    : "text-white/90 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-2 py-3 font-medium text-white/90 hover:text-white">
                  <User className="w-5 h-5" />
                  My account
                </div>
              </Link>
            ) : (
              <div className="py-3 border-t border-white/20 mt-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-2">
                  <User className="w-4 h-4" />
                  Account
                </div>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 pl-6 text-white/90 hover:text-white">
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 pl-6 text-white/90 hover:text-white">
                  Sign up
                </Link>
              </div>
            )}
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-4 bg-white hover:bg-white/90 text-primary font-semibold">
                Shop Now
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
