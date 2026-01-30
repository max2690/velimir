"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Title } from "@/components/ui";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Сколько времени занимает изготовление?",
    answer: "Сроки зависят от сложности проекта и материалов. В среднем процесс занимает от 2 до 6 недель, включая проектирование и ручную доводку.",
  },
  {
    question: "Как формируется стоимость?",
    answer: "Цена каждого изделия рассчитывается индивидуально. Она складывается из стоимости выбранных материалов (порода дерева, объем смолы), сложности формы и затрат на ЧПУ-обработку.",
  },
  {
    question: "Работаете ли вы по России?",
    answer: "Да, наше производство находится в России. Мы организуем бережную доставку готовых изделий в любой регион страны через проверенные транспортные компании.",
  },
  {
    question: "Есть ли гарантия на изделия?",
    answer: "Мы предоставляем гарантию на все наши изделия. Также мы даем подробные рекомендации по уходу за материалами (дерево, смола), чтобы объект сохранял свой первозданный вид десятилетиями.",
  },
];

const FAQItem = ({ faq }: { faq: typeof faqs[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-separator">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 sm:py-6 md:py-8 flex items-center justify-between text-left group gap-4"
      >
        <span className="text-base sm:text-lg md:text-xl font-display uppercase tracking-tight group-hover:text-foreground transition-colors text-left">
          {faq.question}
        </span>
        <span className="shrink-0">{isOpen ? <Minus size={20} className="text-secondary" /> : <Plus size={20} className="text-secondary" />}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 sm:pb-8 text-secondary text-sm sm:text-base leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <Section id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-24">
        <div>
          <Title subtitle="Ответы на часто задаваемые вопросы о процессе заказа и производства.">
            FAQ
          </Title>
        </div>
        
        <div className="lg:col-span-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </Section>
  );
};
