import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import authClient from "./authClient";
import type { AuthResponse, LoginDto, RegisterDto } from "@/types/types";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

function extractErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string; errors?: { msg: string }[] }>(error)) {
    return (
      error.response?.data?.errors?.[0]?.msg ??
      error.response?.data?.message ??
      "Не удалось выполнить запрос"
    );
  }
  return "Не удалось выполнить запрос";
}

export const login = createAsyncThunk<AuthResponse, LoginDto, { rejectValue: string }>(
  "auth/login",
  async (dto, { rejectWithValue }) => {
    try {
      const { data } = await authClient.post<AuthResponse>("/auth/login", dto);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const register = createAsyncThunk<AuthResponse, RegisterDto, { rejectValue: string }>(
  "auth/register",
  async (dto, { rejectWithValue }) => {
    try {
      const { data } = await authClient.post<AuthResponse>("/auth/register", dto);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Ошибка входа";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Ошибка регистрации";
      });
  },
  selectors: {
    selectAuthStatus: (state) => state.status,
    selectAuthError: (state) => state.error,
    selectIsAuthenticated: (state) => Boolean(state.token),
  },
});

export const { logout } = authSlice.actions;
export const { selectAuthStatus, selectAuthError, selectIsAuthenticated } =
  authSlice.selectors;
export default authSlice.reducer;