import { z } from "zod";

export const serviceSchema = z.object({
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
  price: z.number(),
  type: z.string(),
  department: z.number(),
});

export type ServiceFormType = z.infer<typeof serviceSchema>;
