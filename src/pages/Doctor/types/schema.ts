import { z } from "zod";
const DayScheduleSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
});

export const WorkScheduleSchema = z.object({
  monday: DayScheduleSchema.optional(),
  tuesday: DayScheduleSchema.optional(),
  wednesday: DayScheduleSchema.optional(),
  thursday: DayScheduleSchema.optional(),
  friday: DayScheduleSchema.optional(),
  saturday: DayScheduleSchema.optional(),
  sunday: DayScheduleSchema.optional(),
});

export const doctorsSchema = z.object({
  name: z.object({
    uz: z.string().min(1, "Name Uz majburiy"),
    en: z.string().min(1, "Name En majburiy"),
    ru: z.string().min(1, "Name Ru majburiy"),
  }),
  about: z.object({
    uz: z.string().min(1, "About Uz majburiy"),
    en: z.string().min(1, "About En majburiy"),
    ru: z.string().min(1, "About Ru majburiy"),
  }),
  experience: z.object({
    uz: z.string().min(1, "Experience Uz majburiy"),
    en: z.string().min(1, "Experience En majburiy"),
    ru: z.string().min(1, "Experience Ru majburiy"),
  }),
  education: z.object({
    uz: z.string().min(1, "Education Uz majburiy"),
    en: z.string().min(1, "Education En majburiy"),
    ru: z.string().min(1, "Education Ru majburiy"),
  }),
  award: z.object({
    uz: z.string().min(1, "Award Uz majburiy"),
    en: z.string().min(1, "Award En majburiy"),
    ru: z.string().min(1, "Award Ru majburiy"),
  }),
  workExperience: z.coerce.number().min(0, "Ish tajribasi noto‘g‘ri"),
  departments: z.array(z.number()).min(1, "Kamida 1ta bo‘lim tanlang"),
  doctorType: z.boolean(),
  docEnum: z.string(),
  image: z.any().optional(),
  appointmentDuration: z.number(),
  workSchedule: WorkScheduleSchema,
});

export type DoctorFormType = z.infer<typeof doctorsSchema>;
