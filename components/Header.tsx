"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { name: "Направления", href: "#products" },
  { name: "Кейсы", href: "#cases" },
  { name: "Галерея", href: "#gallery" },
  { name: "Контакты", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled ? "bg-background py-4 border-b border-separator" : "bg-transparent py-8"
        )}
      >
        <div className="section-container flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-medium tracking-tighter">
            VELIMIR
          </Link>
          
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-secondary hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-secondary hover:text-foreground transition-colors"
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
