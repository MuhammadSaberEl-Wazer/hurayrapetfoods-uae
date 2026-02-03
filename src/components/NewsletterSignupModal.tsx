import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import footerData from "@/data/footer.json";

const STORAGE_KEY = "hurayra_newsletter_modal";
const SHOW_AFTER_MS = 30_000; // 30 seconds of browsing
const RE_SHOW_AFTER_DAYS = 7;

function shouldShowModal(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const data = JSON.parse(raw) as { closedAt?: number };
    if (!data.closedAt) return true;
    const daysSince = (Date.now() - data.closedAt) / (1000 * 60 * 60 * 24);
    return daysSince >= RE_SHOW_AFTER_DAYS;
  } catch {
    return true;
  }
}

function markModalClosed() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ closedAt: Date.now() })
    );
  } catch {
    /* ignore */
  }
}

export default function NewsletterSignupModal() {
  const [open, setOpen] = useState(false);
  const [timerReady, setTimerReady] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [catName, setCatName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!shouldShowModal()) return;
    const t = setTimeout(() => {
      setTimerReady(true);
    }, SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (timerReady && shouldShowModal()) setOpen(true);
  }, [timerReady]);

  const handleClose = (open: boolean) => {
    if (!open) markModalClosed();
    setOpen(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    // Simulate submit; replace with real API (e.g. Klaviyo) later
    await new Promise((r) => setTimeout(r, 500));
    markModalClosed();
    setOpen(false);
    setFirstName("");
    setLastName("");
    setCatName("");
    setEmail("");
    toast({
      title: footerData.newsletter.successMessage,
      description: "We'll send you updates on new products, offers, and cat care tips.",
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-[600px] w-[95vw] p-5 sm:p-6 rounded-none border border-black/10 bg-white [&>button:last-of-type]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={() => handleClose(false)}
      >
        <button
          type="button"
          onClick={() => handleClose(false)}
          aria-label="Close dialog (إغلاق)"
          className="absolute z-[100] right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:text-black border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <X className="w-5 h-5" strokeWidth={1.5} aria-hidden />
        </button>

        <div className="flex flex-col w-full min-h-0 justify-center pt-2">
          {/* Logo */}
          <div className="flex justify-center py-2">
            <img
              src="/logos/main-logo.svg"
              alt={footerData.logo.text}
              className="h-10 w-auto"
              style={{ filter: "brightness(0)" }}
            />
          </div>

          {/* Title */}
          <DialogTitle
            id="newsletter-modal-title"
            className="text-center text-[28px] font-bold font-montserrat text-teal-light px-4 sm:px-12 pt-4 pb-2"
          >
            {footerData.newsletter.title}
          </DialogTitle>

          {/* Subtitle */}
          <p className="text-center text-base sm:text-lg font-montserrat text-teal-dark/90 px-4 sm:px-12 pb-4">
            {footerData.newsletter.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 px-2 sm:px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="modal-first-name" className="sr-only">
                  First name
                </Label>
                <Input
                  id="modal-first-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name (الاسم الأول)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-14 rounded-none border border-black px-4 text-base font-normal"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="modal-last-name" className="sr-only">
                  Last name
                </Label>
                <Input
                  id="modal-last-name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name (الاسم الأخير)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-14 rounded-none border border-black px-4 text-base font-normal"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="modal-cat-name" className="sr-only">
                Your cat's name
              </Label>
              <Input
                id="modal-cat-name"
                type="text"
                placeholder="Your cat's name (اسم قطتك)"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="h-14 rounded-none border border-black px-4 text-base font-normal"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="modal-email" className="sr-only">
                Email
              </Label>
              <Input
                id="modal-email"
                type="email"
                autoComplete="email"
                placeholder={footerData.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-none border border-black px-4 text-base font-normal"
              />
            </div>

            <div className="pt-2 px-4 sm:px-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-none bg-teal-dark hover:bg-teal-dark/90 text-white font-bold font-montserrat text-xl"
              >
                {isSubmitting ? "Submitting…" : footerData.newsletter.buttonText}
              </Button>
            </div>
          </form>

          <p className="text-center text-xs font-montserrat text-muted-foreground px-4 pt-2 pb-1">
            By subscribing you agree to receive news and offers from {footerData.logo.text}.
            You can unsubscribe at any time via the link in our emails.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
