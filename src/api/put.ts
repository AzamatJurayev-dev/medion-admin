import type { CategoryType } from "../types";
import request from "../utils/httpRequest";
const baseURL = import.meta.env.VITE_BASE_URL;
export const updateCategory = async ({
  id,
  nameUz,
  nameRu,
  nameEn,
}: CategoryType) => {
  const response = await request.put(`${baseURL}/categories/${id}`, {
    data: {
      nameUz,
      nameRu,
      nameEn,
    },
  });
  return response.data;
};
