import type { Dayjs } from "dayjs";

export interface ArticleAttributes {
  author: string;
  title: {
    uz: string;
    en: string;
    ru: string;
  };
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
  createDate: Dayjs;
}
export interface ArticleUpdate {
  id: number;
  author: string;
  title: {
    uz: string;
    en: string;
    ru: string;
  };
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
  createDate: Dayjs;
}
export interface ArticleItem {
  id: number;
  attributes: ArticleAttributes;
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
