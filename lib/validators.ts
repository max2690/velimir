import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  direction: z.enum([
    "art-objects",
    "epoxy-tables",
    "custom-furniture",
    "cnc-services"
  ], {
    errorMap: () => ({ message: "Выберите направление" })
  }),
  comment: z.string().optional(),
  // Hidden fields
  page: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type LeadType = z.infer<typeof LeadSchema>;
