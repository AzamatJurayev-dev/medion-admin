import { z } from "zod";

export const partnerSchema = z.object({
  title: z.string().min(1, "Title is required"),
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
  phoneNumber: z.string().min(1, "Phone number is required"),
  link: z.string().min(1, "Link is required"),
  image: z.any().optional(),
});

export type PartnerFormType = z.infer<typeof partnerSchema>;
export type UpdatePartnerForm = { id: number } & PartnerFormType;
