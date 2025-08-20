export interface BannerItem {
  id: number;
  title: Lang;
  description: Lang;
  coverImage: {
    data: {
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
export interface BannerResponse {
  data: BannerItem[];
}
