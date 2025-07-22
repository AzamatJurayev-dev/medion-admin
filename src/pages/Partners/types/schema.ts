import { z } from "zod";

export const partnerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subdescUz: z.string().min(1, "Subdescription in Uzbek is required"),
  subdescEn: z.string().min(1, "Subdescription in English is required"),
  subdescRu: z.string().min(1, "Subdescription in Russian is required"),
  descriptionUz: z.string().min(1, "Description in Uzbek is required"),
  descriptionEn: z.string().min(1, "Description in English is required"),
  descriptionRu: z.string().min(1, "Description in Russian is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  link: z.string().min(1, "Link is required"),
  image: z.any().optional(),
});

export type PartnerFormType = z.infer<typeof partnerSchema>;
export type UpdatePartnerForm = { id: number } & PartnerFormType;
