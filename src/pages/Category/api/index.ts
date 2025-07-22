import request from "../../../utils/httpRequest";
import type { CategoryFormType, UpdateCategoryPayload } from "../types/schema";

export const deleteCategory = async (id: number): Promise<void> => {
  await request.delete(`/categories/${id}`);
  return;
};

export const postCatigories = async ({
  nameUz,
  nameRu,
  nameEn,
}: CategoryFormType) => {
  const response = await request.post(`/categories`, {
    data: {
      nameUz,
      nameRu,
      nameEn,
    },
  });
  return response.data;
};
export const updateCategory = async ({
  id,
  nameUz,
  nameRu,
  nameEn,
}: UpdateCategoryPayload) => {
  const response = await request.put(`/categories/${id}`, {
    data: {
      nameUz,
      nameRu,
      nameEn,
    },
  });
  return response.data;
};