"use client";

import React from "react";
import { Section, Title } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";

export const CTAForm = () => {
  return (
    <Section id="contact" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24">
        <div>
          <Title subtitle="Оставьте заявку на расчет проекта или консультацию. Мы свяжемся с вами в ближайшее время.">
            Обсудить <br className="hidden sm:block" /> проект
          </Title>
          <div className="space-y-2 sm:space-y-4 text-secondary text-sm sm:text-base">
            <p>Телефон: +7 (924) 009-88-80</p>
            <p>Email: info@velimir-lux.ru</p>
            <p>Пн — Пт: 10:00 – 19:00</p>
          </div>
        </div>
        
        <LeadForm />
      </div>
    </Section>
  );
};
