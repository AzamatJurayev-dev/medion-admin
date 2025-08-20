import request from "../../../utils/httpRequest";
import type { PhotosResponse } from "../types";

export const getPhotos = async (): Promise<PhotosResponse> => {
  const response = await request.get<PhotosResponse>(`photos`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

