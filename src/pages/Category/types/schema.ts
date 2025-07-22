import { z } from "zod";
export const categorySchema = z.object({
  nameUz: z.string().min(1, "nameUz majburiy"),
  nameEn: z.string().min(1, "nameEn majburiy"),
  nameRu: z.string().min(1, "nameRu majburiy"),
});
export type CategoryFormType = z.infer<typeof categorySchema>;
export type UpdateCategoryPayload = { id: number } & CategoryFormType;