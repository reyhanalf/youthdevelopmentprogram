"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  scrollProgress?: number;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Materi", href: "/materi" },
    { name: "Eksplorasi Diri", href: "/assessment" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/45 h-20 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full">
        <div className="flex items-center gap-12">
          <Link className="text-2xl font-extrabold text-primary" href="/">
            YDP
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  className={`font-body-base transition-colors ${
                    active
                      ? "relative text-primary font-semibold active-nav-link"
                      : "text-on-surface-variant hover:text-primary font-medium"
                  }`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/assessment"
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 active:scale-95 shadow-md shadow-primary/10 flex items-center justify-center"
          >
            Mulai Assessment
          </Link>
          <button className="lg:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-border-subtle p-6 shadow-lg flex flex-col gap-4 z-45 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`font-medium py-2 border-b border-border-subtle/50 ${
                isActive(link.href) ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
              }`}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Scroll Progress Bar */}
      {scrollProgress !== undefined && (
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-100">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
    </nav>
  );
}
