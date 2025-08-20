import axios from "axios";
import type { Login, Register } from "../types";
const baseURL = import.meta.env.VITE_BASE_URL;
export const loginUser = async ({ identifier, password }: Login) => {
  const response = await axios.post(`${baseURL}/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};

export const registerUser = async ({ username, email, password }: Register) => {
  const response = await axios.post(`${baseURL}/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};
