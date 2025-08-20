import type { DoctorResponse } from "../../Doctor/types";

export interface Lang {
  uz: string;
  en: string;
  ru: string;
}
export interface ServiceItem {
  id: number;
  type: string;
  price: number;
  title: Lang;
  description: Lang;
  department: {
    data: {
      title: Lang;
    };
  };
  doctors: DoctorResponse;
}

export interface ServiceResponse {
  data: ServiceItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
