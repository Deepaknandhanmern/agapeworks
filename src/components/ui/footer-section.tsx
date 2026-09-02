"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// Same facts as the contact page's own contactPoints - kept as plain text
// here (a footer isn't the place to duplicate its icon-card treatment).
const contactPoints = [
  { icon: Mail, value: "studio@agapeworks.in" },
  { icon: Clock, value: "Replies within 1 business day" },
  { icon: MapPin, value: "Coimbatore & Chennai, India" },
];

// Same three profiles as the contact page - placeholder hrefs until real
// profile URLs exist, matching that page's own "swap in the real URLs" note.
const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

function Footerdemo() {
  const pathname = usePathname();
  const isVivira = pathname?.startsWith("/products") ?? false;
  const [subscribed, setSubscribed] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const email = new FormData(e.currentTarget).get("email");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubscribed(true);
    } catch {
      setError("Couldn't reach the server. Please try again.");
    }
  };

  return (
    <footer className={cn("relative border-t bg-background text-foreground", isVivira && "vivira-theme")}>
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-muted-foreground">
              Get occasional updates on what we&apos;re building and shipping.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-foreground">Thanks - you&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pr-12 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
                {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
              </form>
            )}
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2.5 text-sm not-italic">
              {contactPoints.map(({ icon: Icon, value }) => (
                <p key={value} className="flex items-center gap-2">
                  <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                  {value}
                </p>
              ))}
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <TooltipProvider>
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Icon className="h-4 w-4" />
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on {label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t pt-8 text-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Agape Works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
