import request from "../../../utils/httpRequest";

export const getTeams = async () => {
  const response = await request.get(`/teams`, {
    params: {
      populate: "*",
    },
  });
  return response.data;
};

export const postTeams = async (formData: FormData) => {
  const response = await request.post("/teams", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const deleteTeam = async (id: number): Promise<void> => {
  await request.delete(`/teams/${id}`);
  return;
};
export const updateTeam = async (id: number, formData: FormData) => {
  const response = await request.put(`/teams/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
