import { z } from "zod";

export const departmentSchema = z.object({
    titleUz: z.string().min(1, "Title Uz majburiy"),
    titleEn: z.string().min(1, "Title En majburiy"),
    titleRu: z.string().min(1, "Title Ru majburiy"),
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
    icon: z.any().optional(),
});
export type DepartmentFormType = z.infer<typeof departmentSchema>;
export type UpdateDepartmentForm = { id: number } & DepartmentFormType;
