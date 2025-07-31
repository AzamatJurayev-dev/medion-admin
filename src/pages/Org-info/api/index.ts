import request from "../../../utils/httpRequest";

export const getInfo = async () => {
  const response = await request.get(`/org-info`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postInfo = async (formData: FormData) => {
  const response = await request.post("/org-info", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteInfo = async (id: number): Promise<void> => {
  await request.delete(`/org-info/${id}`);
  return;
};
export const updateInfo = async (id: number, formData: FormData) => {
  const response = await request.put(`/org-info/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
