import request from "../../../utils/httpRequest";
import type { ArticleListResponse } from "../types";

export const getArticles = async (): Promise<ArticleListResponse> => {
  const response = await request.get<ArticleListResponse>("/articles", {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const createArticle = async (formData: FormData) => {
  const response = await request.post("/articles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const updateArticle = async (id: number, formData: FormData) => {
  const response = await request.put(`/articles/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteArticle = async (id: number): Promise<void> => {
  await request.delete(`/articles/${id}`);
  return;
};
