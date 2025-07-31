import request from "../../../utils/httpRequest";
import type { PromoResponse } from "../types";


export const postPromo = async (formData: FormData) => {
  const response = await request.post(`/promotions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getPromos = async (): Promise<PromoResponse> => {
  const response = await request.get<PromoResponse>(`/promotions`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const deletePromo = async (id: number): Promise<void> => {
  await request.delete(`/promotions/${id}`);
  return;
};
export const updatePromo = async (id: number, formData: FormData) => {
  const response = await request.put(`/promotions/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
