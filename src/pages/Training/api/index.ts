import request from "../../../utils/httpRequest";

export const getTranings = async () => {
  const response = await request.get(`/tranings`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postTranings = async (formData: FormData) => {
  const response = await request.post("/tranings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteTraning = async (id: number): Promise<void> => {
  await request.delete(`/tranings/${id}`);
  return;
};
export const updateTraning = async (id: number, formData: FormData) => {
  const response = await request.put(`/tranings/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
