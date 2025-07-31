export interface PartnerType{
    id: number;
    attributes: PartnerAttributes;
}
export interface PartnerAttributes {
  title: string;
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  phoneNumber: string;
  link: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
}
export interface PartnerAttributesUpdate {
  id: number;
  title: string;
  subDesc: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  phoneNumber: string;
  link: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
}
export interface PartnerResponse{
    data:PartnerType[]
}