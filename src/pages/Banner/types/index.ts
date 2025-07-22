export interface BannerItem {
  id: number;
  attributes:BannerAttributs
}
export interface BannerAttributs {
  titleUz: string;
  titleEn: string;
  titleRu: string;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
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
