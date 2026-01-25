import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Section, Title } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import Image from "next/image";
import { MessageSquare, Send, Phone } from "lucide-react";

export const metadata = {
  title: "Контакты | VELIMIR LUX",
  description: "Свяжитесь с нами для обсуждения вашего проекта. Мастерская VELIMIR LUX — мебель и арт-объекты на заказ.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <Section className="pt-48 pb-24">
        <Title as="h1">Контакты</Title>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <a 
            href="https://wa.me/70000000000" 
            target="_blank" 
            className="group p-8 border border-separator hover:border-foreground transition-all duration-500"
          >
            <MessageSquare className="mb-6 text-secondary group-hover:text-foreground transition-colors" size={32} />
            <h3 className="text-lg uppercase tracking-widest mb-2">WhatsApp</h3>
            <p className="text-secondary text-sm">Быстрое обсуждение и расчет</p>
          </a>
          
          <a 
            href="https://t.me/velimir" 
            target="_blank" 
            className="group p-8 border border-separator hover:border-foreground transition-all duration-500"
          >
            <Send className="mb-6 text-secondary group-hover:text-foreground transition-colors" size={32} />
            <h3 className="text-lg uppercase tracking-widest mb-2">Telegram</h3>
            <p className="text-secondary text-sm">Консультация и примеры работ</p>
          </a>
          
          <a 
            href="tel:+70000000000" 
            className="group p-8 border border-separator hover:border-foreground transition-all duration-500"
          >
            <Phone className="mb-6 text-secondary group-hover:text-foreground transition-colors" size={32} />
            <h3 className="text-lg uppercase tracking-widest mb-2">Телефон</h3>
            <p className="text-secondary text-sm">+7 (000) 000-00-00</p>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <p className="text-secondary text-lg leading-relaxed">
              Мы всегда открыты для новых идей и сложных задач. Если у вас есть проект, который требует инженерной точности и художественного подхода — давайте его обсудим.
            </p>
            <div className="pt-8 border-t border-separator">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Наш адрес</h4>
              <p className="text-foreground uppercase tracking-widest">Россия, г. [Ваш Город]</p>
              <p className="text-secondary text-xs mt-2">Работаем по всей России и СНГ</p>
            </div>
            
            <div className="w-48 h-48 bg-separator/10 relative border border-separator p-4">
              <Image 
                src="/qr/velimir-qr.png" 
                alt="Velimir QR" 
                fill 
                className="object-contain grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-secondary/20 pointer-events-none">
                SCAN TO CONNECT
              </div>
            </div>
          </div>
          
          <div className="bg-separator/5 p-8 md:p-12 border border-separator">
            <h3 className="text-xl font-display uppercase tracking-widest mb-8">Напишите нам</h3>
            <LeadForm />
          </div>
        </div>
      </Section>
      
      <Footer />
      <FloatingContact />
    </main>
  );
}
