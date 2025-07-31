import request from "../../../utils/httpRequest";
import type { NewsResponse } from "../types";

export const getNews = async (): Promise<NewsResponse> => {
  const response = await request.get<NewsResponse>(`/news`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postNews = async (formData: FormData) => {
  const response = await request.post("/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteNews = async (id: number): Promise<void> => {
  await request.delete(`/news/${id}`);
  return;
};
export const updateNews = async (id: number, formData: FormData) => {
  const response = await request.put(`/news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
