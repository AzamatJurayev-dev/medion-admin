export interface PartnerType{
    id: number;
    attributes: PartnerAttributes;
}
export interface PartnerAttributes {
    title: string;
    subdescUz: string;
    subdescEn: string;
    subdescRu: string;
    descroptionUz: string;
    descroptionEn: string;
    descroptionRu: string;
    phoneNumber: string;
    link: string;
    image: {
        data: {
            id: number;
            attributes: {
                url: string;
            };
        }
    }
}
export interface PartnerResponse{
    data:PartnerType[]
}