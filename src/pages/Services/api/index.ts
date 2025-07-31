import request from "../../../utils/httpRequest";
import type { ServiceResponse } from "../types";

export const postService = async (formData: FormData) => {
  const response = await request.post(`/services`, formData);
  return response.data;
};

export const getServices = async (): Promise<ServiceResponse> => {
  const response = await request.get<ServiceResponse>(`/services`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await request.delete(`/services/${id}`);
  return;
};
export const updateService = async (id: number, formData: FormData) => {
  const response = await request.put(`/services/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
