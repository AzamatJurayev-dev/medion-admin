import request from "../../../utils/httpRequest";
import type { AwardResponse } from "../types";

export const getAwards = async (): Promise<AwardResponse> => {
  const response = await request.get<AwardResponse>(`/awards`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postAwards = async (formData: FormData) => {
  const response = await request.post("/awards", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteAward = async (id: number): Promise<void> => {
  await request.delete(`/doctors/${id}`);
  return;
};
export const updateAward = async (id: number, formData: FormData) => {
  const response = await request.put(`/doctors/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
