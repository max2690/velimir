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
    <footer className="bg-background border-t border-separator pt-24 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-display mb-8">VELIMIR</h2>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Мастерская форм и смысла. 
              Архитектурная мебель и арт-объекты из дерева и смолы.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-8">Навигация</h4>
            <ul className="space-y-4">
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
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-8">Контакты</h4>
            <ul className="space-y-4">
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

          <div className="flex flex-col items-start lg:items-end">
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground mb-8">Связь через QR</h4>
            <div className="w-32 h-32 bg-separator/20 relative border border-separator p-2">
              <Image 
                src="/qr/velimir-qr.png" 
                alt="Velimir QR" 
                fill 
                className="object-contain grayscale contrast-125"
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
