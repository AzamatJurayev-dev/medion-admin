export interface DepartmentAttributes {
  titleUz: string;
  titleEn: string;
  titleRu: string;
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  icon: {
    data?: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
export interface DepartmentItem {
  id: number;
  attributes: DepartmentAttributes;
}
export interface DepartmentResponse {
  data: DepartmentItem[];
}
