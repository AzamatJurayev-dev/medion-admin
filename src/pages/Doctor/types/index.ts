import type { DepartmentResponse } from "../../Department/types";

export interface Lang {
  uz: string;
  en: string;
  ru: string;
}
export interface DoctorItem {
  id: number;
  name: Lang;
  about: Lang;
  experience: Lang;
  education: Lang;
  award: Lang;
  doctorType: boolean;
  docEnum: string;
  workExperience: number;
  departments: DepartmentResponse;
  appointmentDuration: number;
  workSchedule: WorkSchedule;
  workPhotos: { data: WorkPhotos[] };
  image: {
    data?: {
      id: number;
      url: string;
    };
  };
}
export interface DaySchedule {
  start_time: string ;
  end_time: string;
}
export interface WorkPhotos {
  id: number;
  url: string;
}
export interface WorkSchedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}


export interface DoctorResponse {
  data: DoctorItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
