import { z } from "zod";
export const articleSchema = z.object({
  author: z.string().min(1, "Author is required"),
  title: z.object({
    uz: z.string().min(1, "Title Uz is required"),
    en: z.string().min(1, "Title En is required"),
    ru: z.string().min(1, "Title Ru is required"),
  }),
  subDesc: z.object({
    uz: z.string().min(1, "Sub Description Uz is required"),
    en: z.string().min(1, "Sub Description En is required"),
    ru: z.string().min(1, "Sub Description Ru is required"),
  }),
  createDate: z.date(),
  image: z.any().optional(),
});

export type ArticleFormType = z.infer<typeof articleSchema>;
