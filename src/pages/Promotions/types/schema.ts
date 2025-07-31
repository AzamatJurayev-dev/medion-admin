import { z } from "zod";

export const promoSchema = z.object({
  title: z.object({
    uz: z.string().min(1, "Title Uz majburiy"),
    en: z.string().min(1, "Title En majburiy"),
    ru: z.string().min(1, "Title Ru majburiy"),
  }),
  subDesc: z.object({
    uz: z.string().min(1, "Description Uz majburiy"),
    en: z.string().min(1, "Description En majburiy"),
    ru: z.string().min(1, "Description Ru majburiy"),
  }),
  description: z.object({
    uz: z.string().min(1, "Description Uz majburiy"),
    en: z.string().min(1, "Description En majburiy"),
    ru: z.string().min(1, "Description Ru majburiy"),
  }),
  promotion_term: z.object({
    uz: z.string().min(1, "Description Uz majburiy"),
    en: z.string().min(1, "Description En majburiy"),
    ru: z.string().min(1, "Description Ru majburiy"),
  }),
  start_date: z.date(),
  end_date: z.date(),
  promoImage: z.any().optional(),
});

export type PromoFormType = z.infer<typeof promoSchema>;
