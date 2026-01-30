"use client";

import React from "react";
import { Section, Title } from "@/components/ui";

export const Philosophy = () => {
  return (
    <Section id="philosophy" className="bg-background -mt-6 relative z-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <Title 
            subtitle="Мы создаём формы, которые становятся частью пространства. Velimir Lux — это не просто мебель, это архитектурный подход к ремеслу."
          >
            Формы, рожденные <br /> из тишины
          </Title>
        </div>
        
        <div className="space-y-8">
          <p className="text-secondary text-lg leading-relaxed">
            Velimir Lux — мастерская индивидуальных форм. Мы работаем с эпоксидной смолой, массивом дерева и металлом, создавая мебель и арт-объекты под конкретные пространства и задачи.
          </p>
          <p className="text-secondary text-lg leading-relaxed">
            Точность ЧПУ сочетается с ручной доводкой, а каждый проект проходит полный цикл — от идеи до готового изделия. Мы верим в материальность, точность и долговечность.
          </p>
        </div>
      </div>
    </Section>
  );
};
