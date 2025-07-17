import type { CategoryType, Login } from "../types";
import request from "../utils/httpRequest";
const baseURL = import.meta.env.VITE_BASE_URL;

export const loginUser = async ({ identifier, password }: Login) => {
  const response = await request.post(`${baseURL}/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};

export const postCatigories = async ({
  nameUz,
  nameRu,
  nameEn,
}: Omit<CategoryType, "id">) => {
  const response = await request.post(`${baseURL}/categories`, {
    data: {
      nameUz,
      nameRu,
      nameEn,
    },
  });
  return response.data;
};
