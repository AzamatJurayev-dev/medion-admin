// redux/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// localStorage'dan qiymatlarni olish funksiyasi
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getInitialUserId = (): number | null => {
  if (typeof window !== "undefined") {
    const id = localStorage.getItem("userId");
    return id ? Number(id) : null;
  }
  return null;
};

interface AuthState {
  token: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  token: getInitialToken(),
  userId: getInitialUserId(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: number }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;

      // localStorage ga saqlash
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userId", action.payload.userId.toString());
      }
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;

      // localStorage dan o‘chirish
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
