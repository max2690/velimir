"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:right-8 z-40 flex flex-col space-y-3 sm:space-y-4"
        >
          <a 
            href="https://wa.me/79240098880"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-12 sm:h-12 bg-background border border-separator flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground transition-all duration-300 touch-manipulation"
            aria-label="WhatsApp"
          >
            <MessageSquare size={18} />
          </a>
          <a 
            href="tel:+79240098880"
            className="w-11 h-11 sm:w-12 sm:h-12 bg-background border border-separator flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground transition-all duration-300 touch-manipulation"
            aria-label="Позвонить"
          >
            <Phone size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
