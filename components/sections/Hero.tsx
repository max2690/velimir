"use client";

import React from "react";
import { Button } from "@/components/ui";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/50 md:bg-background/60 z-10" />
      </div>

      {/* Content */}
      <div className="section-container relative z-30 text-center px-4 sm:px-6">
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-medium mb-6 sm:mb-8 tracking-tighter">
            VELIMIR
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-foreground/80 mb-3 sm:mb-4 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Мастерская форм и смысла
          </p>
          <p className="text-secondary text-xs sm:text-sm md:text-base mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed">
            мебель · арт-объекты · индивидуальные изделия
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Обсудить проект
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 sm:space-y-4 z-20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-secondary">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-separator to-transparent" />
      </div>

      {/* V-Shape Divider (150° angle) */}
      <div className="absolute bottom-0 left-0 w-full h-6 z-30 pointer-events-none">
        <svg 
          className="w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,200 L600,15 L1200,200 Z"
            fill="#0F1113"
          />
        </svg>
      </div>
    </section>
  );
};
