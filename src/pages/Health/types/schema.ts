import { z } from "zod";

export const bannerSchema = z.object({
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
  coverImage: z.any().optional(),
});

export type BannerFormType = z.infer<typeof bannerSchema>;
export type UpdateBannerForm = { id: number } & BannerFormType;
