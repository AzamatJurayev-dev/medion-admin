import request from "../../../utils/httpRequest";
import type { DoctorResponse } from "../types";

export const getDoctorDetail = async (id: string): Promise<DoctorResponse> => {
  const response = await request.get<DoctorResponse>(`/doctors/${id}`, {
    params: {
      populate: {
        workSchedule: { populate: "*" },
        name: true,
        about: true,
        experience: true,
        education: true,
        award: true,
        departments: { populate: "*" },
        image: { populate: "*" },
        workPhotos: { populate: "*" },
      },
    },
  });
  return response.data;
};
