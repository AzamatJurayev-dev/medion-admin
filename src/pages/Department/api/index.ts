import request from "../../../utils/httpRequest";
export const postDepartments = async (formData: FormData) => {
  const response = await request.post("/departments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteDepartments = async (id: number): Promise<void> => {
  await request.delete(`/departments/${id}`);
  return;
};
export const updateDepartments = async (id: number, formData: FormData) => {
  const response = await request.put(`/departments/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};