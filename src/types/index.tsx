export interface Login {
  identifier: string;
  password: string;
}

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
