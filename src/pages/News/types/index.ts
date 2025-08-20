import type { Dayjs } from "dayjs";

export interface Lang {
  uz: string;
  en: string;
  ru: string;
}

export interface NewsPhotos {
  data: {
    id: number;
    url: string;
  };
}
export interface NewsItem {
  id: number;
  title: Lang;
  description: Lang;
  subDesc: Lang;
  createDate: Dayjs;
  photos: {
    data: {
      id: number;
      url: string;
    }[];
  };
}
export interface NewsResponse {
  data: NewsItem[];
}
