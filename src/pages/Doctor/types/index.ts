export interface DoctorItem {
  id: number;
  attributes: DoctorAttributes;
}
export interface DoctorAttributes {
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  about: {
    uz: string;
    en: string;
    ru: string;
  };
  experience: {
    uz: string;
    en: string;
    ru: string;
  };
  education: {
    uz: string;
    en: string;
    ru: string;
  };
  award: {
    uz: string;
    en: string;
    ru: string;
  };
  doctorType: boolean;
  docEnum: string;
  workExperience: number;
  departments: {
    data?: {
      id: number;
      attributes: {
        titleUz: string;
        titleEn: string;
        titleRu: string;
      };
    }[];
  };
  image: {
    data?: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
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
export interface DoctorAttributes1 {
  id: number;
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  about: {
    uz: string;
    en: string;
    ru: string;
  };
  experience: {
    uz: string;
    en: string;
    ru: string;
  };
  education: {
    uz: string;
    en: string;
    ru: string;
  };
  award: {
    uz: string;
    en: string;
    ru: string;
  };
  doctorType: boolean;
  docEnum: string;
  workExperience: number;
  departments: {
    data?: {
      id: number;
      attributes: {
        titleUz: string;
        titleEn: string;
        titleRu: string;
      };
    }[];
  };
  image: {
    data?: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
