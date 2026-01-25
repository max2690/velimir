"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, Title } from "@/components/ui";

const steps = [
  { id: "01", name: "Анализ", desc: "Изучение задачи, пространства и пожеланий заказчика." },
  { id: "02", name: "Проектирование", desc: "Разработка 3D-модели и технической документации." },
  { id: "03", name: "Подбор материалов", desc: "Выбор слэбов, пигментов смолы и фурнитуры." },
  { id: "04", name: "ЧПУ", desc: "Прецизионная фрезеровка и создание точной геометрии." },
  { id: "05", name: "Ручная доводка", desc: "Шлифовка, полировка и внимание к каждому миллиметру." },
  { id: "06", name: "Сборка", desc: "Финальное соединение элементов и монтаж." },
  { id: "07", name: "Контроль качества", desc: "Проверка на соответствие стандартам Velimir." },
];

export const Process = () => {
  return (
    <Section id="process" className="bg-background">
      <Title subtitle="От концепции до финального штриха — прозрачный и технологичный цикл создания.">
        Процесс
      </Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <span className="text-4xl font-display text-separator mb-6 block">
              {step.id}
            </span>
            <h3 className="text-lg font-medium mb-4 uppercase tracking-widest">{step.name}</h3>
            <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
            
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 -right-6 w-12 h-px bg-separator/30" />
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
