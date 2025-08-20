import request from "../../../utils/httpRequest";
import type { DoctorResponse } from "../types";

export const getDoctors = async (): Promise<DoctorResponse> => {
  const response = await request.get<DoctorResponse>("doctors", {
    params: {
      populate: {
        workSchedule: { populate: "*" },
        name: true,
        about: true,
        experience: true,
        education: true,
        award: true,
        departments:{populate:"*"},
        image:{populate:"*"},
        workPhotos:{populate:"*"},
      },
    },
  });
  return response.data;
};

export const postDoctor = async (formData: FormData) => {
  const response = await request.post("/doctors", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteDoctor = async (id: number): Promise<void> => {
  await request.delete(`/doctors/${id}`);
  return;
};
export const updateDoctor = async (id: number, formData: FormData) => {
  const response = await request.put(`/doctors/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
