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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐱</span>
            </div>
            <span className="font-causten text-xl font-bold text-gray-900">
              Hurayra <span className="text-primary">Pet Foods</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CartIcon />
            <Link to="/products">
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white">
                Shop Now
              </Button>
            </Link>
            {user ? (
              <Link to="/account">
                <Button variant="outline" size="sm" className="hidden md:inline-flex gap-2">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
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
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-3 font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-2 py-3 font-medium text-gray-600 hover:text-primary">
                  <User className="w-5 h-5" />
                  My account
                </div>
              </Link>
            ) : (
              <div className="py-3 border-t border-gray-100 mt-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                  <User className="w-4 h-4" />
                  Account
                </div>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 pl-6 text-gray-600 hover:text-primary">
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 pl-6 text-gray-600 hover:text-primary">
                  Sign up
                </Link>
              </div>
            )}
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
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
