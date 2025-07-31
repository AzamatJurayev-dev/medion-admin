import type { Dayjs } from "dayjs";

export interface PromoItem {
  id: number;
  attributes: PromoAttributs;
}
export interface PromoAttributs {
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
  promotion_term: {
    uz: string;
    en: string;
    ru: string;
  };
  start_date: Dayjs;
  end_date: Dayjs;
  promoImage: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
export interface PromoAttributsUpdate {
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
  promotion_term: {
    uz: string;
    en: string;
    ru: string;
  };
  start_date: Dayjs;
  end_date: Dayjs;
  promoImage: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
export interface PromoResponse {
  data: PromoItem[];
}
