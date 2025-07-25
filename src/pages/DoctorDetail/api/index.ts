import request from "../../../utils/httpRequest";
import type { DoctorResponse } from "../types";

export const getDoctorDetail = async (id: string): Promise<DoctorResponse> => {
  const response = await request.get<DoctorResponse>(`/doctors/${id}`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};
