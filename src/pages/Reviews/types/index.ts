export interface ReviewsAttributes {
  review_text: string;
  review_star: number;
  isShow: boolean;
  createdAt: string;
  users_permissions_user: {
    data: {
      id: number;
      attributes: {
        username: string;
      };
    };
  };
}
export interface ReviewsAttributesUpdate {
  id: number;
  review_text: string;
  review_star: number;
  isShow: boolean;
  createdAt: string;
  users_permissions_user: {
    data: {
      id: number;
      attributes: {
        username: string;
      };
    };
  };
}

export interface ReviewsItem {
  id: number;
  attributes: ReviewsAttributes;
}
export interface ReviewsResponse {
  data: ReviewsItem[];
}
