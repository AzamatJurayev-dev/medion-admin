export interface AwardAttributes {
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
  image: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}
export interface AwardAttributesUpdate {
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
  image: {
    data: {
      attributes: {
        id: number;
        url: string;
      };
    };
  };
}

export interface AwardItem {
  id: number;
  attributes: AwardAttributes;
}
export interface AwardResponse {
  data: AwardItem[];
}
