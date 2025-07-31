import request from "../../../utils/httpRequest";

export const getUsers = async () => {
  const response = await request.get(`/users`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postUsers = async (formData: FormData) => {
  const response = await request.post("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteUser = async (id: number): Promise<void> => {
  await request.delete(`/users/${id}`);
  return;
};
export const updateUser = async (id: number, formData: FormData) => {
  const response = await request.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
