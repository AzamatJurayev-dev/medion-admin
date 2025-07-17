import request from "../utils/httpRequest";
const baseURL = import.meta.env.VITE_BASE_URL;

export const deleteCategory = async (id: number): Promise<void> => {
  await request.delete(`${baseURL}/categories/${id}`);
  return; // void return qilish
};
