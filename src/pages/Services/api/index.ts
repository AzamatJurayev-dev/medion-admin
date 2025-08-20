import request from "../../../utils/httpRequest";
import type { DoctorResponse } from "../../Doctor/types";
import type { ServiceResponse } from "../types";
import type { ServiceFormType } from "../types/schema";

export const postService = async (data: ServiceFormType) => {
  const response = await request.post(`/services`, { data });
  return response.data;
};

export const getServices = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<ServiceResponse> => {
  const response = await request.get<ServiceResponse>(`/services`, {
    params: {
      populate: {
        doctors: { populate: "*" },
        department: { populate: "*" },
        title: true,
        description: true,
        image: { populate: "*" },
      },
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    },
  });
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await request.delete(`/services/${id}`);
  return;
};
export const updateService = async (id: number, data: ServiceFormType) => {
  const response = await request.put(`/services/${id}`, { data });
  return response.data;
};
export const getDoctors = async (): Promise<DoctorResponse> => {
  const response = await request.get<DoctorResponse>("doctors", {
    params: {
      populate: "*",
    },
  });
  return response.data;
};
