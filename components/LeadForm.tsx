"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadSchema, LeadType } from "@/lib/validators";
import { Button } from "@/components/ui";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { SuccessMessage } from "@/components/SuccessMessage";
import { AnimatePresence, motion } from "framer-motion";

const directions = [
  { id: "art-objects", label: "Арт-объекты и игры" },
  { id: "epoxy-tables", label: "Столы из смолы" },
  { id: "custom-furniture", label: "Мебель на заказ" },
  { id: "cnc-services", label: "ЧПУ услуги" },
];

export const LeadForm = ({ className }: { className?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadType>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      direction: "art-objects",
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadType) => {
    setIsSubmitting(true);
    
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...data,
      page: window.location.pathname,
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
      referrer: document.referrer || undefined,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ok) {
        toast.success("Заявка успешно отправлена");
        reset();
        setIsSubmitted(true);
        if (typeof window !== "undefined" && (window as any).ym) {
          (window as any).ym(process.env.NEXT_PUBLIC_YM_ID, "reachGoal", "lead_submit_success");
        }
      } else {
        throw new Error(result.error || "Failed to send lead");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке. Пожалуйста, свяжитесь с нами через мессенджеры.");
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(process.env.NEXT_PUBLIC_YM_ID, "reachGoal", "lead_submit_error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <SuccessMessage />
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          className={cn("space-y-8", className)}
        >
          <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-secondary">Ваше имя</label>
              <input
                {...register("name")}
                className={cn(
                  "w-full bg-transparent border-b border-separator py-3 sm:py-4 focus:border-foreground outline-none transition-colors text-base",
                  errors.name && "border-red-500/50"
                )}
                placeholder="Иван"
              />
              {errors.name && <p className="text-[10px] text-red-500/80 uppercase">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-secondary">Телефон</label>
              <input
                {...register("phone")}
                className={cn(
                  "w-full bg-transparent border-b border-separator py-3 sm:py-4 focus:border-foreground outline-none transition-colors text-base",
                  errors.phone && "border-red-500/50"
                )}
                placeholder="+7 (___) ___-__-__"
              />
              {errors.phone && <p className="text-[10px] text-red-500/80 uppercase">{errors.phone.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-secondary">Направление</label>
            <select
              {...register("direction")}
              className="w-full bg-background border-b border-separator py-4 focus:border-foreground outline-none transition-colors appearance-none cursor-pointer"
            >
              {directions.map((dir) => (
                <option key={dir.id} value={dir.id} className="bg-background py-4">
                  {dir.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-secondary">Комментарий</label>
            <textarea
              {...register("comment")}
              rows={4}
              className="w-full bg-transparent border-b border-separator py-4 focus:border-foreground outline-none transition-colors resize-none"
              placeholder="Расскажите о вашей идее..."
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full disabled:opacity-50"
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
          
          <p className="text-[10px] text-secondary/50 uppercase leading-relaxed text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
