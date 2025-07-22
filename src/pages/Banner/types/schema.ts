import { z } from "zod";

export const bannerSchema = z.object({
  titleUz: z.string().min(1, "nameUz majburiy"),
  titleEn: z.string().min(1, "nameEn majburiy"),
  titleRu: z.string().min(1, "nameRu majburiy"),
  coverImage: z.any().optional(),
  descriptionUz: z.string().min(1, "descriptionUz majburiy"),
  descriptionEn: z.string().min(1, "descriptionEn majburiy"),
  descriptionRu: z.string().min(1, "descriptionRu majburiy"),
});
export type BannerFormType = z.infer<typeof bannerSchema>;
export type UpdateBannerForm = { id: number } & BannerFormType;