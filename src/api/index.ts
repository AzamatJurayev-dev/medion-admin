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
