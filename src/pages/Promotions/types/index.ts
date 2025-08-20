import type { Dayjs } from "dayjs";

export interface Lang {
  uz: string;
  en: string;
  ru: string;
}
export interface PromoItem {
  id: number;
  title: Lang;
  description: Lang;
  subDesc: Lang;
  promotion_term: Lang;
  start_date: Dayjs;
  end_date: Dayjs;
  promoImage: {
    data: {
      id: number;
      url: string;
    };
  };
}
export interface PromoResponse {
  data: PromoItem[];
}
