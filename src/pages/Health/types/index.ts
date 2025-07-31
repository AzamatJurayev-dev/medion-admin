export interface BannerItem {
  id: number;
  attributes:BannerAttributs
}
export interface BannerAttributs {
  title: {
    uz: string;
    en: string;
    ru: string;
  },
  description: {
    uz: string;
    en: string;
    ru: string;
  },
  coverImage: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
export interface BannerResponse {
  data: BannerItem[];
}
