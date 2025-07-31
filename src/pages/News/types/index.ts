import type { Dayjs } from "dayjs";

export interface NewsAttributes {
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
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  createDate: Dayjs;
  photos: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    }[];
  };
}
export interface NewsAttributesUpdate {
  id: number;
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
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  createDate: Dayjs;
  photos: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    }[];
  };
}
export interface NewsPhotos {
  data: {
    attributes: {
      id: number;
      url: string;
    };
  };
}
export interface NewsItem {
  id: number;
  attributes: NewsAttributes;
}
export interface NewsResponse {
  data: NewsItem[];
}
