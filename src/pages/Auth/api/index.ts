import request from "../../../utils/httpRequest";
import type { Login } from "../types";

// Login qilish va JWT + user ma'lumotlarini olish
export const loginUser = async ({
  identifier,
  password,
}: Login) => {
  const response = await request.post(`/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};
