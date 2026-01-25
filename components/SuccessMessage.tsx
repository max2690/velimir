"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export const SuccessMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center space-y-8 py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-separator/20 flex items-center justify-center"
      >
        <CheckCircle2 size={40} className="text-foreground" />
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tighter">
          Заявка отправлена
        </h3>
        <p className="text-secondary text-lg leading-relaxed max-w-md">
          Спасибо за обращение. Мы свяжемся с вами в ближайшее время для обсуждения проекта.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link href="/">
          <Button variant="outline" className="w-full sm:w-auto">
            На главную
          </Button>
        </Link>
        <a href="https://wa.me/70000000000" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="w-full sm:w-auto">
            Написать в WhatsApp
          </Button>
        </a>
      </div>
    </motion.div>
  );
};
