import request from "../../../utils/httpRequest";

export const getPhotos = async () => {
  const response = await request.get(`/photos`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};
export const postPhotos = async ({ formData }: { formData: FormData }) => {
  const response = await request.post(`/photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const updatePhoto = async (id: number, formData: FormData) => {
  const response = await request.put(`/photos/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePhoto = async (id: number): Promise<void> => {
  await request.delete(`/photos/${id}`);
  return;
};
