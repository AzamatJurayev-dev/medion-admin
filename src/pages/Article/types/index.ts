import type { Dayjs } from "dayjs";

export interface Lang {
  uz: string;
  en: string;
  ru: string;
}
export interface ArticleItem {
  id: number;
  author: string;
  title: Lang;
  subDesc: Lang;
  image?: {
    data?: {
      url: string;
    };
  };
  createDate: Dayjs;
}
export interface ArticleListResponse {
  data: ArticleItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
