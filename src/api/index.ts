import type { DepartmentResponse } from "../pages/Department/types";
import request from "../utils/httpRequest";

export const getDepartments = async (): Promise<DepartmentResponse> => {
  const response = await request.get<DepartmentResponse>("/departments", {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postPhotos = async (formData: FormData) => {
  const response = await request.post(`photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};