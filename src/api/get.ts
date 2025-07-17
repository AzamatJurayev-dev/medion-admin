import type { CategoryResponse} from "../types";
import request from "../utils/httpRequest";

export const getCategories = async (): Promise<CategoryResponse> => {
  const response = await request.get<CategoryResponse>(`/categories`);
  return response.data;
};

