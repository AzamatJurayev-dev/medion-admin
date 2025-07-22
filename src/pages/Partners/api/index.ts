import request from "../../../utils/httpRequest";
import type { PartnerResponse } from "../types";

export const getPartners = async ():Promise<PartnerResponse> => {
  const response = await request.get<PartnerResponse>("/partners", {
    params: {
      populate: "*",
    },
  });
  return response.data;
};
export const postPartners = async (formData: FormData) => {
  const response = await request.post("/partners", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deletePartners = async (id: number): Promise<void> => {
  await request.delete(`/partners/${id}`);
  return;
};
export const updatePartners = async (id: number, formData: FormData) => {
  const response = await request.put(`/partners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
