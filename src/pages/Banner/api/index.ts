import request from "../../../utils/httpRequest";
import type { BannerResponse } from "../types";

export const postBanner = async (formData: FormData) => {
  const response = await request.post(`/banners`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getBanners = async (): Promise<BannerResponse> => {
  const response = await request.get<BannerResponse>(`/banners`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const deleteBanner = async (id: number): Promise<void> => {
  await request.delete(`/banners/${id}`);
  return;
};
export const updateBanner = async (id: number, formData: FormData) => {
  const response = await request.put(`/banners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
