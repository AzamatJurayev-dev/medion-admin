
export interface CategoryType {
  id: number;
  nameUz: string;
  nameEn: string;
  nameRu: string;
}

export interface CategoryResponse {
  data: {
    id: number;
    attributes: {
      nameUz: string;
      nameEn: string;
      nameRu: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CoverImageAttributes {
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface CoverImageData {
  id: number;
  attributes: CoverImageAttributes;
}

export interface CoverImage {
  data: CoverImageData;
}
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
