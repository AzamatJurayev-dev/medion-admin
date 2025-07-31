import request from "../../../utils/httpRequest";
import type { ReviewsResponse } from "../types";

export const getReviews = async (): Promise<ReviewsResponse> => {
  const response = await request.get<ReviewsResponse>(`/reviews`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};
export const deleteReviews = async (id: number): Promise<void> => {
  await request.delete(`/reviews/${id}`);
  return;
};
export const updateReviewsShow = async ({
  id,
  isShow,
}: {
  id: number;
  isShow: boolean;
}) => {
  const response = await request.put(`/reviews/${id}`, {
    data: {
      isShow,
    },
  });
  return response.data;
};
