"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Направления", href: "#products" },
  { name: "Кейсы", href: "#cases" },
  { name: "Галерея", href: "#gallery" },
  { name: "Контакты", href: "#contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100]"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-background border-l border-separator z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-separator">
              <span className="text-2xl font-display tracking-tighter">VELIMIR</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-secondary hover:text-foreground transition-colors"
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center px-6 space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-2xl font-display uppercase tracking-wider text-secondary hover:text-foreground transition-colors py-2"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-separator">
              <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 text-center">
                VELIMIR LUX
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
