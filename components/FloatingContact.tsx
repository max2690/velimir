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
          className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4"
        >
          <a 
            href="https://wa.me/79240098880"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-background border border-separator flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground transition-all duration-300"
            aria-label="WhatsApp"
          >
            <MessageSquare size={18} />
          </a>
          <a 
            href="tel:+79240098880"
            className="w-12 h-12 bg-background border border-separator flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground transition-all duration-300"
            aria-label="Phone"
          >
            <Phone size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
