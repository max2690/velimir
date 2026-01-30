"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Title, Button } from "@/components/ui";
import Image from "next/image";
import { X } from "lucide-react";
import { useParallax } from "@/lib/hooks/useParallax";

const cases = [
  {
    id: "c01",
    title: "Переговорный стол «Infinity»",
    task: "Создать переговорный стол для современного офиса.",
    solution: "Стол из массива дуба с заливкой глубокого синего цвета, индивидуальные размеры 3.5м, металлическое основание.",
    result: "Функциональный центр переговорной, подчеркивающий статус пространства.",
    image: "/img/cases/c01.jpg",
  },
  {
    id: "c02",
    title: "Шахматный набор «Geometric»",
    task: "Игровой набор в подарок для коллекционера.",
    solution: "Шахматы из экзотического дерева и смолы с индивидуальной геометрией фигур, выполненной на ЧПУ.",
    result: "Арт-объект и функциональная игра в одном предмете.",
    image: "/img/cases/c02.jpg",
  },
  {
    id: "c03",
    title: "Инсталляция для лобби",
    task: "Декоративное решение для входной группы ЖК.",
    solution: "Световой арт-объект из смолы и металла, имитирующий структуру горного хребта.",
    result: "Уникальный визуальный акцент, ставший визитной карточкой объекта.",
    image: "/img/cases/c03.jpg",
  },
];

export const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  return (
    <Section id="cases">
      <Title subtitle="Реализованные проекты, где идея обрела форму.">
        Кейсы
      </Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item, index) => {
          const CaseCard = () => {
            const [imageError, setImageError] = useState(false);
            const parallaxSpeed = (index % 2 === 0 ? 0.06 : -0.06);
            const offset = useParallax(parallaxSpeed);

            return (
              <div
                key={item.id}
                className="group cursor-pointer transition-transform hover:-translate-y-2"
                onClick={() => setSelectedCase(item)}
              >
                <div className="relative aspect-video overflow-hidden bg-separator/10 mb-6">
                  <div
                    style={{ transform: `translateY(${offset}px)` }}
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                  >
                    {!imageError ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={() => setImageError(true)}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-separator/20 text-secondary text-xs uppercase tracking-widest">
                        Скоро
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-lg uppercase tracking-widest">{item.title}</h3>
                <p className="text-secondary text-xs mt-2 uppercase tracking-widest">Подробнее →</p>
              </div>
            );
          };

          return <CaseCard key={item.id} />;
        })}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-background border border-separator overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 z-10 text-secondary hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    fill
                    className="object-cover grayscale contrast-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full flex items-center justify-center bg-separator/20 text-secondary text-sm uppercase tracking-widest';
                      placeholder.textContent = 'Изображение скоро появится';
                      target.parentElement?.appendChild(placeholder);
                    }}
                    unoptimized
                  />
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <h3 className="text-2xl font-display mb-12 uppercase tracking-tighter">{selectedCase.title}</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Задача</h4>
                      <p className="text-sm leading-relaxed">{selectedCase.task}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Решение</h4>
                      <p className="text-sm leading-relaxed">{selectedCase.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Результат</h4>
                      <p className="text-sm leading-relaxed">{selectedCase.result}</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-12"
                    onClick={() => {
                      setSelectedCase(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Хочу похожий проект
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
};
