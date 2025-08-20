export interface DepartmentItem {
  id: number;
  title: Lang;
  description: Lang;
  subDesc: Lang;
  icon: {
    data?: {
      id: number;
      url: string;
    };
  };
}
export interface Lang {
  uz: string;
  en: string;
  ru: string;
}
export interface DepartmentResponse {
  data: DepartmentItem[];
}
