import { z } from "zod";

export const newsSchema = z.object({
  title: z.object({
    uz: z.string().min(1, "Title Uz majburiy"),
    en: z.string().min(1, "Title En majburiy"),
    ru: z.string().min(1, "Title Ru majburiy"),
  }),
  description: z.object({
    uz: z.string().min(1, "Description Uz majburiy"),
    en: z.string().min(1, "Description En majburiy"),
    ru: z.string().min(1, "Description Ru majburiy"),
  }),
  subDesc: z.object({
    uz: z.string().min(1, "Sub Description Uz majburiy"),
    en: z.string().min(1, "Sub Description En majburiy"),
    ru: z.string().min(1, "Sub Description Ru majburiy"),
  }),
  photos: z.any().optional(),
  createDate: z.date(),
});
export type NewsFormType = z.infer<typeof newsSchema>;
