"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const [year, setYear] = useState<string | null>(null);
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return (
    <footer className="bg-background border-t border-separator pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-16 mb-16 sm:mb-20 md:mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-xl sm:text-2xl font-display mb-6 sm:mb-8">VELIMIR</h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-xs">
              Мастерская форм и смысла. 
              Архитектурная мебель и арт-объекты из дерева и смолы.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-5 sm:mb-8">Навигация</h4>
            <ul className="space-y-3 sm:space-y-4">
              {["Направления", "Кейсы", "Галерея", "Процесс"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-sm text-secondary hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-5 sm:mb-8">Контакты</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <a href="tel:+79240098880" className="text-sm text-secondary hover:text-foreground">
                  +7 (924) 009-88-80
                </a>
              </li>
              <li>
                <a href="https://t.me/velimir" className="text-sm text-secondary hover:text-foreground">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://wa.me/79240098880" className="text-sm text-secondary hover:text-foreground">
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="text-[10px] text-secondary/50 mt-8 uppercase tracking-widest">
              Производство: Россия. Работаем по всей стране.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-5 sm:mb-8">Связь через QR</h4>
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-separator/20 relative border border-separator p-2">
              <Image 
                src="/qr/velimir-qr.png" 
                alt="Velimir QR" 
                fill 
                sizes="128px"
                className="object-contain grayscale-[0.78] contrast-125"
              />
              {/* Fallback if no image */}
              <div className="absolute inset-0 flex items-center justify-center text-[8px] text-secondary/30 pointer-events-none">
                QR CODE
              </div>
            </div>
            <Link href="/contact" className="text-[10px] uppercase tracking-widest text-secondary mt-4 hover:text-foreground transition-colors">
              Перейти в контакты →
            </Link>
          </div>
        </div>
        
        <div className="pt-12 border-t border-separator/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/50">
            © {year ?? "\u00A0"} VELIMIR LUX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8">
            <Link href="/policy" className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
