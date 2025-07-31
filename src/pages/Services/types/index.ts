export interface ServiceItem {
  id: number;
  attributes: ServiceAttributs;
}
export interface ServiceAttributs {
  type: string;
  price: number;
  title: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  department: {
    data: {
      id: number;
      attributes: {
        titleUz: string;
        titleRu: string;
        titleEn: string;
      };
    };
  };
}
export interface ServiceAttributsUpdate {
  id: number;
  type: string;
  price: number;
  title: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  department: {
    data: {
      id: number;
      attributes: {
        titleUz: string;
        titleRu: string;
        titleEn: string;
      };
    };
  };
}
export interface ServiceResponse {
  data: ServiceItem[];
}
